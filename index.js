/**
 * @description
 *
 * @author pkapako
 */
const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 7000;

app.prepare()
  .then(() => {
    const server = new Koa();
    const router = new Router();

    router.get('/', async ctx => {
      await app.render(ctx.req, ctx.res, '/', ctx.query);
      ctx.respond = false;
    });

    router.get('/dashboard', async ctx => {
      await app.render(ctx.req, ctx.res, '/dashboard', ctx.query);
      ctx.respond = false;
    });

    router.get('/courses', async ctx => {
      await app.render(ctx.req, ctx.res, '/courses', ctx.query);
      ctx.respond = false;
    });

    router.get('/auth/login', async ctx => {
      await app.render(ctx.req, ctx.res, '/auth/login', ctx.query);
      ctx.respond = false;
    });

    router.get('/auth/logout', async ctx => {
      await app.render(ctx.req, ctx.res, '/auth/logout', ctx.query);
      ctx.respond = false;
    });

    router.get('/auth/logged-in', async ctx => {
      await app.render(ctx.req, ctx.res, '/auth/logged-in', ctx.query);
      ctx.respond = false;
    });

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res);
      ctx.respond = false;
    });

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200;
      await next();
    });

    server.use(router.routes());
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on Port: ${PORT}`);
    })
  });