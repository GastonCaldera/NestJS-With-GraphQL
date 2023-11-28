import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from '../models/logs.models';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LogsService {
  constructor(@InjectModel('Log') private readonly logModel: Model<Log>) {}

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }

  async findById(id: string): Promise<Log | null> {
    const log = await this.logModel.findById(id);
    if (!log) {
      throw new NotFoundException(`Log with id ${id} not found.`);
    }
    return this.logModel.findById(id).exec();
  }
}
