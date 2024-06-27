import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminRole } from './admin-role.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminRoleService {
  constructor(@InjectModel(AdminRole.name) private adminRoleModel: Model<AdminRole>) {}

  async createAdmin(username: string, password: string): Promise<AdminRole> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminRoleModel({ username, password: hashedPassword });
    return newAdmin.save();
  }

  async validateAdmin(username: string, password: string): Promise<boolean> {
    const admin = await this.adminRoleModel.findOne({ username }).exec();
    if (!admin) {
      return false;
    }
    return bcrypt.compare(password, admin.password);
  }
}
