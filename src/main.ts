import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { useNestTreblle } from 'treblle';

import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './utils/response-format.interceptor';
import { ExceptionFormatFilter } from './utils/exception-format.filter';
import { DomainExceptionInterceptor } from './utils/domain-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new ExceptionFormatFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ResponseFormatInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new DomainExceptionInterceptor());

  // Different types of versioning available - https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const expressInstance = app.getHttpAdapter().getInstance();
  useNestTreblle(expressInstance, {
    apiKey: configService.get<string>('TREBLLE_API_KEY'),
    projectId: configService.get<string>('TREBLLE_PROJECT_ID'),
  });

  await app.listen(3000);
}

bootstrap();
