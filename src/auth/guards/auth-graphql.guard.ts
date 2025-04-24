// import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthenticationError } from '@nestjs/apollo';
//
//
// @Injectable()
// export class GqlAuthGuard extends AuthGuard('jwt'){
//
//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     return ctx.getContext().req;
//   }
//
//   handleRequest(err: any, user: any) {
//     if (err || !user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
//
// }
