import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { forwardRef, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DatabaseModule } from './database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => DatabaseModule),
    ConfigModule.forRoot({ ignoreEnvFile: false, envFilePath: '.env' }),
  ],
})
export class TypeORMCLIModule {}

async function getDataSource(): Promise<DataSource> {
  const app = await NestFactory.createApplicationContext(TypeORMCLIModule);
  await app.init();

  const databaseModule = app.get<DataSource>(DataSource);
  await databaseModule.destroy();
  return databaseModule;
}

export default getDataSource();
