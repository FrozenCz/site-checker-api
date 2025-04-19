import {Res, Controller, Param, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {AdvertisementService} from './advertisement.service';
import { SharpPipe } from '../pipes/sharp.pipe';
import { Multer } from 'multer';
import { Response } from 'express';

@Controller('advertisement')
export class AdvertisementController {

    constructor(private advertisementService: AdvertisementService) {
    }

    @Post(':uuid/images')
    @UseInterceptors(FileInterceptor('file'))
    upload(
        @Param('uuid') uuid: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        // return this.advertisementService.uploadFiles(files, uuid );
        return this.advertisementService.uploadFile(file, uuid );
    }


    @Get(':uuid/images/:imageName')
    async getImage(
        @Param('uuid') uuid: string,
        @Param('imageName') imageName: string,
        @Res() res: Response,
    ) {
        return this.advertisementService.getImage(imageName, res);
    }

}
