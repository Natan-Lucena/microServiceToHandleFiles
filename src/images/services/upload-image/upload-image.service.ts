import { Injectable } from '@nestjs/common';
import { WritePrismaService } from 'src/prisma/write-prisma.service';
import { S3ProviderService } from 'src/providers/services/s3-provider/s3-provider.service';

interface IUploadImage {
  file: Express.Multer.File;
  productId: number;
}

@Injectable()
export class UploadImageService {
  constructor(
    private s3ProviderService: S3ProviderService,
    private writePrisma: WritePrismaService,
  ) {}

  async execute(dto: IUploadImage) {
    const imageFile = await this.s3ProviderService.uploadFile({
      productId: dto.productId,
      file: dto.file,
    });
    return await this.writePrisma.image.create({
      data: {
        documentUrl: imageFile.Location,
        extension: dto.file.mimetype.split('/')[1],
        productId: dto.productId,
      },
    });
  }
}
