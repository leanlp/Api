import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/dto/create-user.dt';

@ApiTags('Customers')
@ApiBearerAuth('access-token')
@Controller('customers')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('fetch')
  @ApiOperation({ summary: 'Fetch and store users from external API' })
  @ApiResponse({
    status: 200,
    description: 'Users fetched and stored successfully.',
  })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  async fetchAndStoreUsers(
    @Headers('x-password') password: string,
  ): Promise<any> {
    const passwordHash = process.env.PASSWORD_HASH;
    if (!(await bcrypt.compare(password, passwordHash))) {
      throw new UnauthorizedException('Invalid password');
    }
    await this.usersService.fetchAndStoreUsers();
    return { message: 'Users fetched and stored successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('encrypted')
  @ApiOperation({ summary: 'Get all clients (encrypted)' })
  @ApiResponse({
    status: 200,
    description: 'Return all data of clients with encrypted data.',
  })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  async findAllEncrypted(
    @Headers('x-password') password: string,
  ): Promise<User[]> {
    const passwordHash = process.env.PASSWORD_HASH;
    if (!(await bcrypt.compare(password, passwordHash))) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.usersService.findAllEncrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Get('decrypted')
  @ApiOperation({ summary: 'Get all clients (decrypted)' })
  @ApiResponse({
    status: 200,
    description: 'Return all data of clients with decrypted data.',
  })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  @ApiHeader({
    name: 'x-second-password',
    description: 'Second Password header',
  })
  async findAllDecrypted(
    @Headers('x-password') password: string,
    @Headers('x-second-password') secondPassword: string,
  ): Promise<any[]> {
    const passwordHash = process.env.PASSWORD_HASH;
    const secondPasswordHash = process.env.SECOND_PASSWORD_HASH;
    if (!passwordHash || !secondPasswordHash) {
      throw new UnauthorizedException('Passwords are not configured correctly');
    }

    if (
      !(await bcrypt.compare(password, passwordHash)) ||
      !(await bcrypt.compare(secondPassword, secondPasswordHash))
    ) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.usersService.findAllDecrypted();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new data encrypted of Client' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateUserDto })
  @ApiHeader({
    name: 'x-password',
    description: 'Password header',
  })
  async create(@Body() createUserDto: User) {
    return this.usersService.create(createUserDto);
  }
}
