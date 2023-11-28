import { Resolver, Query, Args } from '@nestjs/graphql';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/roles.models';

@Resolver()
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role])
  async roles() {
    return this.rolesService.findAll();
  }

  @Query(() => Role)
  async role(@Args('id') id: string) {
    return this.rolesService.findById(id);
  }
}
