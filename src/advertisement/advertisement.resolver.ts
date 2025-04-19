import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {AdvertisementService} from './advertisement.service';
import {Advertisement} from './entities/advertisement.entity';
import {CreateAdvertisementInput} from './dto/create-advertisement.input';
import {UpdateAdvertisementInput} from './dto/update-advertisement.input';
import {AdvertisementImage, DeletedImage} from './entities/advertisement-image.entity';

@Resolver(() => Advertisement)
export class AdvertisementResolver {
    constructor(private readonly advertisementService: AdvertisementService) {
    }

    @Mutation(() => Advertisement)
    createAdvertisement(@Args('createAdvertisementInput') createAdvertisementInput: CreateAdvertisementInput) {
        return this.advertisementService.create(createAdvertisementInput);
    }

    @Query(() => [Advertisement], {name: 'advertisements'})
    findAll(
        @Args('status', { type: () => String, nullable: true }) status?: 'actual' | 'sold',
        @Args('published', { type: () => Boolean, nullable: true }) published?: boolean,
        @Args('limit', { type: () => Int, nullable: true }) limit?: number
    ) {
        return this.advertisementService.findAll({status, published, limit});
    }

    @Query(() => Advertisement, {name: 'advertisement'})
    findOne(@Args('uuid', {type: () => String}) uuid: string) {
        return this.advertisementService.findOne(uuid);
    }

    @Mutation(() => Advertisement)
    updateAdvertisement(
        @Args('uuid', {type: () => String}) uuid: string,
        @Args('updateAdvertisementInput') updateAdvertisementInput: UpdateAdvertisementInput) {
        return this.advertisementService.update(uuid, updateAdvertisementInput);
    }

    @Mutation(() => Advertisement)
    removeAdvertisement(@Args('id', {type: () => Int}) id: number) {
        return this.advertisementService.remove(id);
    }

    @Mutation(() => [AdvertisementImage], {name: 'updateImageOrder'})
    updateImageOrder(
        @Args('uuid', {type: () => String}) uuid: string,
        @Args('ord', {type: () => [String]}) ord: string[]) {
        return this.advertisementService.updateImageOrder(uuid, ord);
    }

    @Mutation(() => AdvertisementImage, {name: 'deleteImage'})
    deleteImage(
        @Args('uuid', {type: () => String}) uuid: string,
        @Args('imageUuid', {type: () => String}) imageUuid: string) {
        return this.advertisementService.deleteImage(uuid, imageUuid);
    }

}
