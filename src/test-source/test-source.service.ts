import { Injectable } from '@nestjs/common';
import { CreateTestSourceInput } from './dto/create-test-source.input';
import { UpdateTestSourceInput } from './dto/update-test-source.input';

@Injectable()
export class TestSourceService {
  create(createTestSourceInput: CreateTestSourceInput) {
    return 'This action adds a new testSource';
  }

  findAll() {
    return `This action returns all testSource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSource`;
  }

  update(id: number, updateTestSourceInput: UpdateTestSourceInput) {
    return `This action updates a #${id} testSource`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSource`;
  }
}
