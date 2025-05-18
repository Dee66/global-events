import { Module } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
import { RetryService } from './retry.service';
import { DlqService } from './dlq.service';

@Module({
  providers: [RateLimiterService, RetryService, DlqService],
  exports: [RateLimiterService, RetryService, DlqService],
})
export class ResilienceModule {}