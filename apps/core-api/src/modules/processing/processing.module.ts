import { Module } from '@nestjs/common';
import { NormalizationService } from './normalization.service';
import { EnrichmentService } from './enrichment.service';

@Module({
  providers: [NormalizationService, EnrichmentService],
  exports: [NormalizationService, EnrichmentService],
})
export class ProcessingModule {}