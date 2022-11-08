import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HashingService } from '../../auth/hashing.service';
import { User } from '../../users/entities/user.entity';
import { TypeORMCLIModule } from '../typeorm-cli.module';

export class SeedInitialUser1667911463021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appCtx = await NestFactory.createApplicationContext(TypeORMCLIModule);
    const hashingService = appCtx.get(HashingService);
    const configService = appCtx.get(ConfigService);

    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        uuid: uuid(),
        name: configService.get<string>('INITIAL_USER_NAME'),
        email: configService.get<string>('INITIAL_USER_EMAIL'),
        password: await hashingService.hashString(
          configService.get<string>('INITIAL_USER_PASSWORD'),
        ),
      }),
    );
    appCtx.close();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const appCtx = await NestFactory.createApplicationContext(TypeORMCLIModule);
    const configService = appCtx.get(ConfigService);

    await queryRunner.query(
      `DELETE FROM "user" WHERE email='${configService.get<string>(
        'INITIAL_USER_EMAIL',
      )}';`,
    );
    appCtx.close();
  }
}
