import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class AdminRole extends Document {
  @ApiProperty({ example: 'admin', description: 'The username of the admin' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the admin' })
  @Prop({ required: true })
  password: string; 
}

export const AdminRoleSchema = SchemaFactory.createForClass(AdminRole);
