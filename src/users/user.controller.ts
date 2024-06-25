import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

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

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiHeader({
    name: 'x-password',
    description: 'Password to access this endpoint',
    required: true,
  })
  @ApiBearerAuth('password')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('fetch')
  @ApiOperation({ summary: 'Fetch and store users from external API' })
  @ApiResponse({ status: 200, description: 'Users fetched and stored successfully.' })
  async fetchAndStoreUsers() {
    await this.usersService.fetchAndStoreUsers();
    return { message: 'Users fetched and stored successfully' };
  }
}
