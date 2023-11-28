import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersResolver } from './resolvers/workers.resolver';
import { WorkerSchema } from './models/shemas/workers.shema';
import { WorkersService } from './services/workers.service';
import { RolesModule } from 'src/roles/roles.module';
import { RoleSchema } from 'src/roles/models/schema/role.schema';
import { LogsModule } from 'src/logs/logs.module';
import { LogSchema } from 'src/logs/models/schemas/logs.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Worker', schema: WorkerSchema },
      { name: 'Role', schema: RoleSchema },
      { name: 'Log', schema: LogSchema },
    ]),
    RolesModule,
    LogsModule,
  ],
  providers: [WorkersResolver, WorkersService],
})
export class WorkersModule {}
