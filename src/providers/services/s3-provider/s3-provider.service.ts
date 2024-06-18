import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import 'dotenv/config';

interface IUploadImage {
  file: Express.Multer.File;
  productId: number;
}

@Injectable()
export class S3ProviderService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile({ file, productId }: IUploadImage) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(productId) + Date.now().toString(),
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.AWS_REGION,
      },
    };
    return await this.s3.upload(params).promise();
  }

  async getFileFromUrl(url: string): Promise<Buffer> {
    const key = url.split('/').slice(-1)[0];

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
    };

    try {
      const data = await this.s3.getObject(params).promise();
      return data.Body as Buffer;
    } catch (error) {
      throw new NotFoundException('Arquivo não encontrado.');
    }
  }
}
