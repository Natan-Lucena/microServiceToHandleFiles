import {
  Controller,
  InternalServerErrorException,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from 'src/images/services/upload-image/upload-image.service';

@Controller('upload-image/:productId')
export class UploadImageController {
  constructor(private uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 3000000 })],
      }),
    )
    file: Express.Multer.File,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    try {
      return await this.uploadImageService.execute({ file, productId });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
