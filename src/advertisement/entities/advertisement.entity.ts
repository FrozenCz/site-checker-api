import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import {AdvertisementImage} from './advertisement-image.entity';

@ObjectType()
@Entity('advertisement')
export class Advertisement extends BaseEntity{

  @Field(() => ID, {description: 'uuid'})
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field(() => String, { description: 'Name of advertisement' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Description of advertisement' })
  @Column({default: ''})
  description: string;

  @Field(() => String, { description: 'Main image' , nullable: true})
  @Column({nullable: true})
  imageUrl: string;

  @Field(() => Number, { description: 'Price' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Field(() => String , { description: 'Status' })
  @Column({default: 'actual'})
  status: 'actual' | 'sold';

  @Field(() => String, { description: 'Created at' })
  @CreateDateColumn({type: 'timestamp without time zone'})
  createdAt: Date

  @Field(() => String, { description: 'Updated at' })
  @UpdateDateColumn({type: 'timestamp without time zone'})
  updatedAt: Date

  @Field(() => Boolean, {description: 'If advertisement is published', defaultValue: false})
  @Column({default: false})
  published: boolean

    @Field(() => [AdvertisementImage], {description: 'Images of advertisement', nullable: true})
    @OneToMany(() => AdvertisementImage , (child) => child.advertisement)
    advertisementImages: AdvertisementImage[];

  @Field(() => String, { description: 'Videos from youtube, separated by ;' })
  @Column({default: ''})
  video: string;

  @Field(() => String, { description: 'Map from google' })
  @Column({default: ''})
  map: string;

}
