import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersResolver } from './resolvers/workers.resolver';
import { WorkerSchema } from './models/shemas/workers.shema';
import { WorkersService } from './services/workers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Worker', schema: WorkerSchema }]),
  ],
  providers: [WorkersResolver, WorkersService],
})
export class WorkersModule {}
