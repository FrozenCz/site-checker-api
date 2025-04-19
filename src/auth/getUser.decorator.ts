import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './model';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const GetUserGql = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = GqlExecutionContext.create(ctx).getContext().req;
    return req.user;
  },
);


