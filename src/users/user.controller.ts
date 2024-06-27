import { Controller, Get, Post, Body, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('access-token')
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
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  async findAllEncrypted(@Headers('x-password') password: string): Promise<User[]> {
    if (password !== 'h') {
      throw new UnauthorizedException('Invalid password');
    }
    return this.usersService.findAllEncrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Get('decrypted')
  @ApiOperation({ summary: 'Get all users (decrypted)' })
  @ApiResponse({ status: 200, description: 'Return all users with decrypted data.' })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  @ApiHeader({
    name: 'x-second-password',
    description: 'Second Password header',
  })
  async findAllDecrypted(@Headers('x-password') password: string, @Headers('x-second-password') secondPassword: string): Promise<any[]> {
    if (password !== 'h' || secondPassword !== 'h2') {
      throw new UnauthorizedException('Invalid password');
    }
    return this.usersService.findAllDecrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Get('fetch')
  @ApiOperation({ summary: 'Fetch and store users from external API' })
  @ApiResponse({ status: 200, description: 'Users fetched and stored successfully.' })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  async fetchAndStoreUsers(@Headers('x-password') password: string): Promise<any> {
    if (password !== 'h') {
      throw new UnauthorizedException('Invalid password');
    }
    await this.usersService.fetchAndStoreUsers();
    return { message: 'Users fetched and stored successfully' };
  }
}
