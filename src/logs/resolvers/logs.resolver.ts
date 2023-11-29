import { Resolver, Query, Args } from '@nestjs/graphql';
import { LogsService } from '../services/logs.service';
import { Log } from '../models/logs.models';

@Resolver()
export class LogsResolver {
  constructor(private readonly logsService: LogsService) {}

  @Query(() => [Log])
  async logs() {
    return this.logsService.findAll();
  }

  @Query(() => Log)
  async log(@Args('id') id: string) {
    return this.logsService.findById(id);
  }
}
