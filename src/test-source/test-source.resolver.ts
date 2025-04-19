import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TestSourceService } from './test-source.service';
import { TestSource } from './entities/test-source.entity';
import { CreateTestSourceInput } from './dto/create-test-source.input';
import { UpdateTestSourceInput } from './dto/update-test-source.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GetUser, GetUserGql } from '../auth/getUser.decorator';
import { User } from '../auth/model';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../auth/auth.guard';


@Resolver(() => TestSource)
export class TestSourceResolver {
  private logger: Logger = new Logger('TEST_SOURCE_RESOLVER');

  constructor(private readonly testSourceService: TestSourceService) {}

  @Mutation(() => TestSource)
  createTestSource(@Args('createTestSourceInput') createTestSourceInput: CreateTestSourceInput) {
    return this.testSourceService.create(createTestSourceInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [TestSource], { name: 'testSources' })
  findAll(
    @GetUserGql() user: User
  ) {
    this.logger.log(user)
    return [];
    // return this.testSourceService.findAll();
  }

  @Query(() => TestSource, { name: 'testSource' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.testSourceService.findOne(id);
  }

  @Mutation(() => TestSource)
  updateTestSource(@Args('updateTestSourceInput') updateTestSourceInput: UpdateTestSourceInput) {
    return this.testSourceService.update(updateTestSourceInput.id, updateTestSourceInput);
  }

  @Mutation(() => TestSource)
  removeTestSource(@Args('id', { type: () => Int }) id: number) {
    return this.testSourceService.remove(id);
  }
}
