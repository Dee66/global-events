import { Module } from '@nestjs/common';
import { CassandraService } from './cassandra.service';
import { PostgresService } from './postgres.service';
import { MongoService } from './mongo.service';

@Module({
  providers: [CassandraService, PostgresService, MongoService],
  exports: [CassandraService, PostgresService, MongoService],
})
export class StorageModule {}