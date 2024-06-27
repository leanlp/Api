import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;
  private readonly iv: Buffer;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    const key = process.env.ENCRYPTION_KEY;
    const iv = process.env.ENCRYPTION_IV;
    if (!key || !iv || key.length !== 64 || iv.length !== 32) {
      throw new Error('Encryption key must be 32 bytes and IV must be 16 bytes, both represented as hex strings in environment variables');
    }
    this.key = Buffer.from(key, 'hex');
    this.iv = Buffer.from(iv, 'hex');
  }

  async create(user: User): Promise<User> {
    const encryptedUser = this.encryptUserData(user.toObject());
    const createdUser = new this.userModel(encryptedUser);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.decryptUserData(user.toObject()));
  }

  async findAllEncrypted(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findAllDecrypted(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.decryptUserData(user.toObject()));
  }

  async fetchAndStoreUsers(): Promise<void> {
    try {
      const { data } = await axios.get('https://62433a7fd126926d0c5d296b.mockapi.io/api/v1/usuarios');

      const transformedData = data.map((userData: any) => {
        const encryptedData = this.encryptUserData(userData);
        return new this.userModel(encryptedData);
      });

      await this.userModel.insertMany(transformedData);
    } catch (error) {
      console.error('Error fetching and storing users:', error);
      throw error;
    }
  }

  encryptUserData(userData: any): any {
    const encryptedData: any = {};
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        if (key === '_id' || key === '__v') {
          encryptedData[key] = userData[key];
        } else if (key === 'compras_realizadas') {
          encryptedData[key] = userData[key];
        } else {
          encryptedData[key] = this.encryptValue(userData[key].toString());
        }
      }
    }
    return encryptedData;
  }

  decryptUserData(userData: any): any {
    const decryptedData: any = {};
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        if (key === '_id' || key === '__v') {
          decryptedData[key] = userData[key];
        } else if (key === 'compras_realizadas') {
          decryptedData[key] = userData[key];
        } else {
          decryptedData[key] = this.decryptValue(userData[key]);
        }
      }
    }
    return decryptedData;
  }

  encryptValue(value: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  decryptValue(encryptedString: string): string {
    if (typeof encryptedString !== 'string') {
      console.error('Expected string but got:', encryptedString);
      return encryptedString;
    }

    const parts = encryptedString.split(':');
    if (parts.length !== 2) {
      console.error('Encrypted string is not in the expected format:', encryptedString);
      return encryptedString;
    }

    const [ivHex, encrypted] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
