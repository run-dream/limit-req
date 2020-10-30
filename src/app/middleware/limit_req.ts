import { Middleware, WebMiddleware, provide } from 'midway';
import { ReqLimitter } from '../lib/limit_req/req_limiter';
import { Redis } from 'ioredis';
@provide()
export class LimitReqMiddleware implements WebMiddleware {
  resolve(): Middleware {
    return async (ctx, next) => {
      // TODO: 如何将bucketSize 和 speed 注入到这里来
      const limitter = new ReqLimitter(
        (ctx.app as any).redis as Redis,
        `${ctx.method}-${ctx.path}`
      );
      if (!(await limitter.acquire())) {
        ctx.throw(503);
      }
      return next();
    };
  }
}
