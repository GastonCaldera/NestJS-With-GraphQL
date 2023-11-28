import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersResolver } from './resolvers/workers.resolver';
import { WorkerSchema } from './models/shemas/workers.shema';
import { WorkersService } from './services/workers.service';
import { RolesModule } from 'src/roles/roles.module';
import { RoleSchema } from 'src/roles/models/schema/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Worker', schema: WorkerSchema },
      { name: 'Role', schema: RoleSchema },
    ]),
    RolesModule,
  ],
  providers: [WorkersResolver, WorkersService],
})
export class WorkersModule {}
