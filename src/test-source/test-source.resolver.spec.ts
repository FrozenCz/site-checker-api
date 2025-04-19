import { Test, TestingModule } from '@nestjs/testing';
import { TestSourceResolver } from './test-source.resolver';
import { TestSourceService } from './test-source.service';

describe('TestSourceResolver', () => {
  let resolver: TestSourceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSourceResolver, TestSourceService],
    }).compile();

    resolver = module.get<TestSourceResolver>(TestSourceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
