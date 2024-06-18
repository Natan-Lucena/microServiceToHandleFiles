import { Module } from '@nestjs/common';
import { ProvidersModule } from './providers/providers.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ProvidersModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
