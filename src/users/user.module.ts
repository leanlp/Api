import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './user.service';  // Ensure this path is correct
import { UsersController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { PasswordMiddleware } from '../middleware/password.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PasswordMiddleware)
      .forRoutes('users');
  }
}
