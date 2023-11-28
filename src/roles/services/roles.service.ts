import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../models/roles.models';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }
}
