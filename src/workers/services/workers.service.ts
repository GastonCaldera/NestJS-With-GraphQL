import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker } from '../models/workers.models';
import { CreateWorkerDto } from '../models/dto/create-worker.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel('Worker') private readonly workerModel: Model<Worker>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return this.workerModel.find().exec();
  }

  async findById(id: string): Promise<Worker | null> {
    return this.workerModel.findById(id).exec();
  }

  async create(createUserDto: CreateWorkerDto): Promise<Worker> {
    const createdUser = new this.workerModel(createUserDto);
    return createdUser.save();
  }
}
