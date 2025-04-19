import { Test, TestingModule } from '@nestjs/testing';
import { TestSourceService } from './test-source.service';

describe('TestSourceService', () => {
  let service: TestSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSourceService],
    }).compile();

    service = module.get<TestSourceService>(TestSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
