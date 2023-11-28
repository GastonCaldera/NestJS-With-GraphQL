import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { WorkersService } from '../services/workers.service';
import { Worker } from '../models/workers.models';
import { CreateWorkerInput } from '../models/inputs/create-workers.input';
import { EditWorkerRoleInput } from '../models/inputs/edit-worker-role.input';

@Resolver()
export class WorkersResolver {
  constructor(private readonly workersService: WorkersService) {}

  @Query(() => [Worker])
  async workers() {
    return this.workersService.findAll();
  }

  @Query(() => Worker)
  async worker(@Args('id') id: string) {
    return this.workersService.findById(id);
  }

  @Mutation(() => Worker)
  async createWorker(@Args('input') input: CreateWorkerInput) {
    return this.workersService.create(input);
  }

  @Mutation(() => Worker)
  async editWorkerRole(@Args('input') input: EditWorkerRoleInput) {
    return this.workersService.editRole(input);
  }
}
