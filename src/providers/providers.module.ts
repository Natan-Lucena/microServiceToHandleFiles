import { Module } from '@nestjs/common';
import { S3ProviderService } from './services/s3-provider/s3-provider.service';

@Module({
  providers: [S3ProviderService]
})
export class ProvidersModule {}
