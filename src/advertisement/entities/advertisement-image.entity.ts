import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Advertisement} from './advertisement.entity';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Entity('advertisement-image', {orderBy: {order: 'ASC'}})
export class AdvertisementImage extends BaseEntity{

    @Field(() => String, {description: 'Image id'})
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Field(() => String, {description: 'Base image name'})
    @Column()
    name: string;

    @Field(() => String, {description: 'Base image url'})
    @Column()
    imageUrl: string;

    @Field(() => Number, {description: 'Order'})
    @Column()
    order: number

    @ManyToOne(() => Advertisement, (advertisement) => advertisement.uuid, { eager: false })
    advertisement: Advertisement;
    @Column()
    advertisementUuid: string;
}


@ObjectType()
export class DeletedImage {

    @Field(() => String, {description: 'Base image name'})
    name: string;

    @Field(() => String, {description: 'Base image url'})
    imageUrl: string;

    @Field(() => Number, {description: 'Order'})
    order: number
}
