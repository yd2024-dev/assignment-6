import Koa from 'koa';
import Router from 'koa-router';
import * as koaSwagger from 'koa2-swagger-ui';  // Correct import
import path from 'path';
import { RegisterRoutes } from './routes/routes'; // TSOA-generated routes

const app = new Koa();
const router = new Router();

// Register TSOA routes
RegisterRoutes(router as any);  // Cast it to `any` to resolve type issues

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';
const swaggerJsonPath = path.resolve(isProduction ? 'swagger/swagger.json' : 'swagger/swagger.json');

// Use koa2-swagger-ui to serve Swagger UI
app.use(koaSwagger.koaSwagger({
  routePrefix: '/docs',  // Swagger UI route
  specPrefix: '/docs/spec',  // Swagger spec route
  exposeSpec: true,  // Expose the Swagger spec JSON
  swaggerOptions: {
    spec: require(swaggerJsonPath),  // Swagger spec path
  }
}));

// Add routes from TSOA
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${port}`);
});
