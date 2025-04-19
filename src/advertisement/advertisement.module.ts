import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementResolver } from './advertisement.resolver';
import { AuthModule } from '../auth/auth.module';
import { AdvertisementController } from './advertisement.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  controllers: [AdvertisementController],
  imports: [
    AuthModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  providers: [AdvertisementResolver, AdvertisementService],
})
export class AdvertisementModule {}
