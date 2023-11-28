import { Module } from '@nestjs/common';
import { LogsService } from './services/logs.service';
import { LogsResolver } from './resolvers/logs.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSchema } from './models/schemas/logs.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  providers: [LogsResolver, LogsService],
  exports: [LogsService],
})
export class LogsModule {}
