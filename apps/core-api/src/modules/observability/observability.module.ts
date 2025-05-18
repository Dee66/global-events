import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { MetricsService } from './metrics.service';

@Module({
  providers: [LoggerService, MetricsService],
  exports: [LoggerService, MetricsService],
})
export class ObservabilityModule {}