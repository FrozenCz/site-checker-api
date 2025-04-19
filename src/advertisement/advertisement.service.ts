import {Inject, Injectable, Res} from '@nestjs/common';
import {CreateAdvertisementInput} from './dto/create-advertisement.input';
import {UpdateAdvertisementInput} from './dto/update-advertisement.input';
import {Advertisement} from './entities/advertisement.entity';
import {MINIO_CONNECTION} from 'nestjs-minio';
import {Client} from 'minio';

const bucketName = 'novymaklerlitomerice';
import {v4 as uuidv4} from 'uuid';
import {AdvertisementImage} from './entities/advertisement-image.entity';
import {Multer} from 'multer';
import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';
import {Response} from 'express';
import {updateDecoratorArguments} from '@nestjs/graphql/dist/plugin/utils/ast-utils';

@Injectable()
export class AdvertisementService {


    constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {
    }


    create(createAdvertisementInput: CreateAdvertisementInput) {
        const advertisement = new Advertisement()
        advertisement.name = createAdvertisementInput.name

        return advertisement.save()
    }

    findAll(args: { status?: 'actual' | 'sold', published?: boolean, limit?: number }) {
        const { limit, ...filters } = args;
        const cleanedFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== undefined));
        const query = Advertisement.createQueryBuilder('advertisement')
            .where(cleanedFilters)
            .orderBy('advertisement.updatedAt', 'DESC');

        if (limit) {
            query.take(limit);
        }
        return query.getMany();
    }

    async findOne(uuid: string) {
        return Advertisement.findOne({where: {uuid}, relations: ['advertisementImages'], order: {advertisementImages: {order: 'ASC'}}});
    }

    async update(uuid: string, updateAdvertisementInput: UpdateAdvertisementInput) {
        const advertisement = await Advertisement.findOne({where: {uuid}});
        advertisement.name = updateAdvertisementInput.name;
        advertisement.description = updateAdvertisementInput.description;
        advertisement.price = updateAdvertisementInput.price;
        advertisement.published = updateAdvertisementInput.published;
        advertisement.status = updateAdvertisementInput.status;
        advertisement.video = updateAdvertisementInput.video;
        advertisement.map = updateAdvertisementInput.map;
        return advertisement.save();
    }

    remove(id: number) {
        return `This action removes a #${id} advertisement`;
    }

    async uploadFiles(files: Express.Multer.File[], uuid: string) {
        return await Promise.all(
            files.map(async (file) => {
                const generatedName = uuid + '_' + uuidv4() + '_' + file.originalname;
                const inMinio = await this.minioClient.putObject(
                    bucketName,
                    generatedName,
                    file.buffer,
                    file.size
                );

                const newImage = new AdvertisementImage();
                newImage.advertisementUuid = uuid;
                newImage.name = generatedName;
                newImage.imageUrl = inMinio.etag;
                newImage.order = (await AdvertisementImage.findAndCount({where: {advertisementUuid: uuid}}))[1] + 1;
                return newImage.save();
            }),
        );
    }

    async uploadFile(image: Express.Multer.File, uuid: string) {


        // const originalName = path.parse(image.originalname).name;
        const filename = uuid + '_' + uuidv4() + '.webp';

        await sharp(image.buffer)
            .resize({height:1066, width: 1600, fit: 'inside'})
            .webp({effort: 3})
            .toFile(path.join('public', 1066 + '_' + filename));

        await sharp(image.buffer)
            .resize({height:400, width: 600, fit: 'inside'})
            .webp({effort: 3})
            .toFile(path.join('public', 400 + '_' + filename));

        await sharp(image.buffer)
            .resize({height:150, width: 225, fit: 'inside'})
            .webp({effort: 3})
            .toFile(path.join('public', 150 + '_' + filename));


        const newImage = new AdvertisementImage();
        newImage.advertisementUuid = uuid;
        newImage.name = filename;
        newImage.imageUrl = filename;
        newImage.order = (await AdvertisementImage.findAndCount({where: {advertisementUuid: uuid}}))[1] + 1;
        const advertisement = await Advertisement.findOne({where: {uuid}});
        if (!advertisement.imageUrl) {
            advertisement.imageUrl = filename;
            await advertisement.save();
        }
        return newImage.save();

    }

    getImage(imageName: string, @Res() res: Response) {
        const filePath = path.join('public', imageName);
        if (fs.existsSync(filePath)) {
            const file = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/webp');
            res.send(file);
        } else {
            throw new Error('File not found' + imageName);
        }
    }

    async updateImageOrder(advertisementUuid: string, ord: string[]) {

        const advertisement = await Advertisement.findOne({
            where: {uuid: advertisementUuid},
            relations: ['advertisementImages']
        });
        const updatedOrderImages = advertisement.advertisementImages.sort((a, b) => ord.indexOf(a.uuid) - ord.indexOf(b.uuid));
        updatedOrderImages.forEach((image, index) => {image.order = index + 1});

        advertisement.imageUrl = (await AdvertisementImage.findOne({where: {uuid: ord[0]}})).imageUrl;
        await advertisement.save();
        return AdvertisementImage.save(updatedOrderImages);
    }

   async deleteImage(advertisementUuid: string, imageUuid: string) {

        const deleteImage = await AdvertisementImage.findOne({where: {uuid: imageUuid, advertisementUuid}});

        try {
            fs.unlinkSync(path.join('public', 1066 + '_' + deleteImage.name));
            fs.unlinkSync(path.join('public', 400 + '_' + deleteImage.name));
            fs.unlinkSync(path.join('public', 150 + '_' + deleteImage.name));
        } catch (e) {
            console.log('image not found');
        }

        const removed = await deleteImage.remove();

       const advertisement = await Advertisement.findOne({
           where: {uuid: advertisementUuid},
           relations: ['advertisementImages']
       });

       const updatedOrderImages = advertisement.advertisementImages.sort((a, b) => a.order - b.order);
       updatedOrderImages.forEach((image, index) => {image.order = index + 1});
       advertisement.imageUrl = updatedOrderImages[0]?.imageUrl ?? null;
       await advertisement.save();
       AdvertisementImage.save(updatedOrderImages);
       return {...removed, uuid: imageUuid};
    }
}
