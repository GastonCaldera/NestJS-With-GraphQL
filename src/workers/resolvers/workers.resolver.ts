import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { WorkersService } from '../services/workers.service';
import { Worker } from '../models/workers.models';
import { CreateWorkerInput } from '../models/inputs/create-workers.input';
import { NotFoundException } from '@nestjs/common';
import { RolesService } from 'src/roles/services/roles.service';

@Resolver()
export class WorkersResolver {
  constructor(
    private readonly workersService: WorkersService,
    private readonly roleService: RolesService,
  ) {}

  @Query(() => [Worker])
  async workers() {
    return this.workersService.findAll();
  }

  @Query(() => Worker)
  async worker(@Args('id') id: string) {
    const worker = await this.workersService.findById(id);
    if (!worker) {
      throw new NotFoundException(`Worker with id ${id} not found`);
    }

    return worker;
  }

  @Mutation(() => Worker)
  async createWorker(@Args('input') input: CreateWorkerInput) {
    const role = await this.roleService.findById(input.role);
    if (!role) {
      throw new NotFoundException(`Role with id ${input.role} not found`);
    }
    return this.workersService.create(input);
  }
}
