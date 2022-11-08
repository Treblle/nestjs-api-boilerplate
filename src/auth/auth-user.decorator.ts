import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  id: number;
  uuid: string;
  email: string;
};

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
