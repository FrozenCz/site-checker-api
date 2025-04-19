import { CreateTestSourceInput } from './create-test-source.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestSourceInput extends PartialType(CreateTestSourceInput) {
  @Field(() => Int)
  id: number;
}
