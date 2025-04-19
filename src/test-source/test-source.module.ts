import { Module } from '@nestjs/common';
import { TestSourceService } from './test-source.service';
import { TestSourceResolver } from './test-source.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [TestSourceResolver, TestSourceService],
})
export class TestSourceModule {}
