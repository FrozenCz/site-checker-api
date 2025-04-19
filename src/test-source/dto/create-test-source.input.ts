import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumberString } from 'class-validator';

@InputType()
export class CreateTestSourceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumberString()
  exampleField: number;
}
