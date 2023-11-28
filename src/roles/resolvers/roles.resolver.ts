import { Resolver, Query } from '@nestjs/graphql';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/roles.models';

@Resolver()
export class RolesResolver {
  constructor(private readonly workersService: RolesService) {}

  @Query(() => [Role])
  async roles() {
    return this.workersService.findAll();
  }
}
