import { Resolver, Query, Args } from '@nestjs/graphql';
import { RolesService } from '../services/roles.service';
import { Role } from '../models/roles.models';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role])
  async roles() {
    return this.rolesService.findAll();
  }

  @Query(() => Role)
  async role(@Args('id') id: string) {
    const role = await this.rolesService.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return role;
  }
}
