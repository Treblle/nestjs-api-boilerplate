import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * Filter to modfify response body in case of HttpExceptions
 */

@Catch()
export class ExceptionFormatFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const newException = new HttpException(
        {
          status: false,
          message: exception.message,
        },
        exception.getStatus(),
      );
      super.catch(newException, host);
    } else {
      super.catch(exception, host);
    }
  }
}
