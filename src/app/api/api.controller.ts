import { provide, get, controller, inject, Context } from 'midway';
@provide()
@controller('/api')
export class ApiController {
  @inject()
  ctx: Context;
  @get('/index', { middleware: ['limitReqMiddleware'] })
  index() {
    this.ctx.body = 'index';
  }
}
