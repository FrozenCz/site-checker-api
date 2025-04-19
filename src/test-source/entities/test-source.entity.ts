import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@Entity('testSource')
export class TestSource extends BaseEntity {

  @Field(() => ID, {description: 'uuid'})
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  @Column({type: 'int'})
  exampleField: number;



}
