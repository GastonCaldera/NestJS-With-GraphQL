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
    return this.workerModel.find().populate('role').populate('boss').exec();
  }

  async findById(id: string): Promise<Worker | null> {
    return this.workerModel
      .findById(id)
      .populate('role')
      .populate('boss')
      .exec();
  }

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const { boss, ...workerData } = createWorkerDto;
    const createdWorker = new this.workerModel({
      ...workerData,
      boss: boss || null,
    });
    return createdWorker.save();
  }
}
