import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('admin')
export class AdminRoleController {
  constructor(
    private readonly adminRoleService: AdminRoleService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.adminRoleService.createAdmin(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const valid = await this.adminRoleService.validateAdmin(body.username, body.password);
    if (!valid) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(body.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
