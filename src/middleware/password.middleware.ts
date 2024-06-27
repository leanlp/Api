import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const password = req.headers['x-password'];
 
    
    if (!password || password !== 'h') {
      throw new UnauthorizedException('Invalid password');
    }
    
    next();
  }
}
