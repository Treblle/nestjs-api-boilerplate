import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostsModule } from './posts/posts.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: false, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
})
export class AppModule {}
