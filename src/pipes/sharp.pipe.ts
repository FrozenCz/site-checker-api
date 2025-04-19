import { Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(image: Express.Multer.File): Promise<string> {


    console.log(image);

    const originalName = path.parse(image.originalname).name;
    const filename = uuidv4() + '-' + originalName + '.webp';

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(path.join('public', 800 + '_' + filename));

    await sharp(image.buffer)
      .resize(600)
      .webp({ effort: 3 })
      .toFile(path.join('public', 600 + '_' + filename));

    await sharp(image.buffer)
      .resize(400)
      .webp({ effort: 3 })
      .toFile(path.join('public', 400 + '_' + filename));

    return filename;
  }
}
