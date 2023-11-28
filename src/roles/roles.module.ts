import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesResolver } from './resolvers/roles.resolver';
import { RolesService } from './services/roles.service';
import { RoleSchema } from './models/schema/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }])],
  providers: [RolesResolver, RolesService],
})
export class RolesModule {}
