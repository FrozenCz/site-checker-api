import { InputType, Field } from '@nestjs/graphql';
import {IsBoolean, IsOptional, IsString, MinLength} from 'class-validator';

@InputType()
export class CreateAdvertisementInput {

  @Field(() => String, {description: 'Advertisement name'})
  @IsString()
  @MinLength(5)
  name: string;

}
