import { CreateAdvertisementInput } from './create-advertisement.input';
import { InputType, Field, Int, PartialType, } from '@nestjs/graphql';

@InputType()
export class UpdateAdvertisementInput extends PartialType(CreateAdvertisementInput) {

  @Field(() => String)
  description: string;

  @Field(() => String)
  video: string;

  @Field(() => String)
  map: string;


  @Field(() => Boolean)
  published: boolean;

  @Field(() => String)
  status: 'actual' | 'sold'

  @Field(() => Int)
  price: number;

}


@InputType()
export class UpdateImageOrd {
  @Field(() => [String])
  ord: string[];
}
