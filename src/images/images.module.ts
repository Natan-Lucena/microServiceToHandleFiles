import { Module } from '@nestjs/common';
import { UploadImageService } from './services/upload-image/upload-image.service';
import { UploadImageController } from './controllers/upload-image/upload-image.controller';
import { S3ProviderService } from 'src/providers/services/s3-provider/s3-provider.service';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { ReadPrismaService } from 'src/prisma/read-prisma.service';

@Module({
  providers: [
    ReadPrismaService,
    WritePrismaService,
    S3ProviderService,
    UploadImageService,
  ],
  controllers: [UploadImageController],
})
export class ImagesModule {}
