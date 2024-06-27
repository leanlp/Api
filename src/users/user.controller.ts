import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';  
import { User } from './user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: User })
  async create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('encrypted')
  @ApiOperation({ summary: 'Get all users (encrypted)' })
  @ApiResponse({ status: 200, description: 'Return all users with encrypted data.' })
  @ApiBearerAuth()
  async findAllEncrypted(): Promise<User[]> {
    return this.usersService.findAllEncrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Get('decrypted')
  @ApiOperation({ summary: 'Get all users (decrypted)' })
  @ApiResponse({ status: 200, description: 'Return all users with decrypted data.' })
  @ApiBearerAuth()
  async findAllDecrypted(): Promise<any[]> {
    return this.usersService.findAllDecrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Get('fetch')
  @ApiOperation({ summary: 'Fetch and store users from external API' })
  @ApiResponse({ status: 200, description: 'Users fetched and stored successfully.' })
  async fetchAndStoreUsers() {
    await this.usersService.fetchAndStoreUsers();
    return { message: 'Users fetched and stored successfully' };
  }
}
