import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Worker } from '../models/workers.models';
import { CreateWorkerDto } from '../models/dto/create-worker.dto';
import { EditWorkerRoleDto } from '../models/dto/edit-worker-role.dto';
import { Role } from 'src/roles/models/roles.models';
import { NotFoundException } from '@nestjs/common';
import { Log } from 'src/logs/models/logs.models';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel('Worker') private readonly workerModel: Model<Worker>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
    @InjectModel('Log') private readonly logModel: Model<Log>,
  ) {}

  async findAll(): Promise<Worker[]> {
    return this.workerModel
      .find()
      .populate('role')
      .populate({
        path: 'boss',
        populate: 'role',
      })
      .exec();
  }

  async findById(id: string): Promise<Worker | null> {
    return this.workerModel
      .findById(id)
      .populate('role')
      .populate({
        path: 'boss',
        populate: 'role',
      })
      .exec();
  }

  async create(createWorkerDto: CreateWorkerDto): Promise<Worker> {
    const { boss: bossId, ...workerData } = createWorkerDto;
    const payload = { ...workerData, boss: null };
    if (!isValidObjectId(createWorkerDto.role)) {
      throw new NotFoundException('Role ID is no a valid Object ID.');
    }
    const role = await this.roleModel.findById(createWorkerDto.role);
    if (!role) {
      throw new NotFoundException(
        `Role with id ${createWorkerDto.role} not found.`,
      );
    }

    if (role.name !== 'manager') {
      if (!bossId) {
        throw new NotFoundException(
          'BossId is required when the role is not manager.',
        );
      } else if (!isValidObjectId(bossId)) {
        throw new NotFoundException('BossId ID is no a valid Object ID.');
      }
      const boss = await this.workerModel.findById(bossId);
      if (!boss) {
        throw new NotFoundException(`Boss with id ${bossId} not found.`);
      }
      const bossRole = await this.roleModel.findById(boss.role);
      if (!['manager', 'supervisor'].includes(bossRole.name)) {
        throw new NotFoundException(
          'The Boss has to be a manager or a supervisor.',
        );
      }
      payload.boss = bossId;
    }
    const createdWorker = new this.workerModel(payload);
    return createdWorker.save();
  }
  async editRole({ id, roleId, bossId }: EditWorkerRoleDto): Promise<Worker> {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    if (!isValidObjectId(roleId)) {
      throw new NotFoundException('Role ID is no a valid Object ID.');
    }
    const role = await this.roleModel.findById(roleId);
    const worker = await this.workerModel.findById(id);
    const log = {
      name: 'Change Role',
      user: id,
      old_role: worker.role,
      old_boss: worker.boss,
      new_boss: '',
      new_role: '',
      created_at: formatter.format(currentDate),
    };
    // Validations
    if (!role) {
      throw new NotFoundException(`Role with id ${roleId} not found.`);
    } else if (!worker) {
      throw new NotFoundException(`Worker with id ${id} not found.`);
    }

    if (role.name !== 'manager') {
      if (!bossId) {
        throw new NotFoundException(
          'BossId is required when the role is not manager.',
        );
      } else if (!isValidObjectId(bossId)) {
        throw new NotFoundException('BossId ID is no a valid Object ID.');
      } else if (bossId === id) {
        throw new NotFoundException('BossId cannot be equal to id.');
      }
      const boss = await this.workerModel.findById(bossId);
      if (!boss) {
        throw new NotFoundException(`Boss with id ${bossId} not found.`);
      }
      const bossRole = await this.roleModel.findById(boss.role);
      if (!['manager', 'supervisor'].includes(bossRole.name)) {
        throw new NotFoundException(
          'The Boss has to be a manager or a supervisor.',
        );
      }
      worker.boss = bossId;
      log.new_boss = bossId;
      log.new_role = roleId;
    } else {
      worker.boss = null;
      log.new_boss = null;
      log.new_role = roleId;
    }
    worker.role = roleId;
    worker.version += 1;
    const createdLog = new this.logModel(log);
    createdLog.save();
    return worker.save();
  }
}
