import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TestSourceModule } from './test-source/test-source.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { NestMinioModule } from 'nestjs-minio';
import { ImagesModule } from './images/images.module';
import { AdvertisementController } from './advertisement/advertisement.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PrometheusModule } from './prometheus/prometheus.module';
import { HealthModule } from './health/health.module';

interface GqpConfig extends ApolloDriverConfig {
  cors?: {
    credentials?: boolean;
    origin?: string;
  };
}

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.STAGE}`] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get("HOST"),
          port: +configService.get<number>("PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          schema: configService.get("DATABASE_SCHEMA"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: configService.get("SYNC"),
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<GqpConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      includeStacktraceInErrorResponses: false,
      cors: {
        credentials: true,
        origin: 'http://localhost:3000',
      },
      context: ({ req }) => ({ req }),
    }),
    NestMinioModule.register({
      endPoint: '46.36.39.68',
      port: 46666,
      useSSL: false,
      accessKey: 'RJ3iWZjvXbx7RIY7eV8p',
      secretKey: 'UQPDF4RYYx1FYtPL8i5ni2q9xidh534mdnjAkvUz',
    }),
    TestSourceModule,
    AdvertisementModule,
    ImagesModule,
    PrometheusModule,
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
