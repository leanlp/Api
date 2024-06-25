import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Headers:', req.headers); 
    const password = req.headers['x-password'];
    console.log('Received password:', password);
    if (password !== 'h') {
      console.log('Invalid password');
      throw new UnauthorizedException('Invalid password');
    }
    console.log('Password accepted');
    next();
  }
}
