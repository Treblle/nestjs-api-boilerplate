import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: boolean;
  message: string;
  data: T;
}

export const SetResponseMessage = (message: string) =>
  SetMetadata('message', message);

@Injectable()
export class ResponseFormatInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const requestDescription = this.reflector.get<string>(
      'message',
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data) => {
        return {
          status: true,
          message: requestDescription || 'Success',
          data,
        };
      }),
    );
  }
}
