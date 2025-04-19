import { Inject, Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Client } from 'minio';

const bucketName = 'novymaklerlitomerice';

@Injectable()
export class ImagesService {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {}

  async upload(files: Express.Multer.File[]) {
    return Promise.all(
      files.map(async (file) => {

        return this.minioClient.putObject(
          bucketName,
          file.originalname,
          file.buffer,
          file.size
        );
      }),
    );
  }

  findAll() {
    return this.minioClient.listBuckets();
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
