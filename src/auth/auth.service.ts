import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}


  private users = [
    {
      userId: 1,
      username: 'test',
      password: '$2a$10$SaJHwdYO/NnXIy0glXgvLuXNeVrVZNHyom3O0M6JtUj199.qcKmke', // hashed password for 'test'
    },
  ];

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Validating user:', username);  //remove
    const user = this.users.find(user => user.username === username);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      console.log('Password match:', isPasswordMatching);  // Debug log
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
