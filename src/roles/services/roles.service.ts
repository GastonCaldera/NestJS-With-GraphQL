import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../models/roles.models';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }
    return this.roleModel.findById(id).exec();
  }
}
