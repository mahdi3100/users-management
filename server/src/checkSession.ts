import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CheckSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):Boolean => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.session.user)
    return request.session.user ? true : false;
  },
);