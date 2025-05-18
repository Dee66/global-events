import { Module } from '@nestjs/common';
import { NifiService } from './nifi.service';

@Module({
  providers: [NifiService],
  exports: [NifiService],
})
export class NifiModule {}