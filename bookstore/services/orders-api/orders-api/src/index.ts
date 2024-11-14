import Koa from 'koa';
import Router from 'koa-router';
import * as koaSwagger from 'koa2-swagger-ui';  // Correct import
import path from 'path';
import { RegisterRoutes } from './routes/routes';  // TSOA-generated routes

const app = new Koa();
const router = new Router();

// Type assertion to match TSOA-generated type
RegisterRoutes(router as any);  // Cast it as `any` to resolve type issue

// Swagger JSON path
const isProduction = process.env.NODE_ENV === 'production';
const swaggerJsonPath = path.resolve(isProduction ? 'swagger/swagger.json' : 'swagger/swagger.json');

// Use koa2-swagger-ui
app.use(koaSwagger.koaSwagger({
  routePrefix: '/docs',
  specPrefix: '/docs/spec',
  exposeSpec: true,
  swaggerOptions: {
    spec: require(swaggerJsonPath),
  }
}));

// Add routes
app.use(router.routes()).use(router.allowedMethods());

// Health check route
app.use(async (ctx, next) => {
  if (ctx.path === '/health') {
    ctx.body = { status: 'ok' };
  } else {
    await next();
  }
});

// Start the app
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Orders API is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${port}`);
});
