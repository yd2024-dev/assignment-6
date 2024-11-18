import Koa from 'koa';
import Router from 'koa-router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-koa';

const app = new Koa();
const router = new Router();

// Define the Swagger documentation
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Warehouse & Orders API',
    version: '1.0.0',
    description: 'API Documentation for Warehouse and Orders Services'
  },
  servers: [
    { url: 'http://localhost:8080' }  // Adjust the URL to match your Nginx routing
  ]
};

// Define the options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./services/warehouse-api/routes/*.ts', './services/orders-api/routes/*.ts'] // Points to the route files in `services`
};

// Generate the Swagger spec
const swaggerSpec = swaggerJSDoc(options);

// Serve the Swagger UI at the /docs endpoint
router.get('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add other routes or middleware if necessary
router.get('/', (ctx) => {
  ctx.body = 'Welcome to the Swagger Docs Service!';
});

// Use the router in the Koa app
app.use(router.routes()).use(router.allowedMethods());

const port = 3003;
app.listen(port, () => {
  console.log(`Swagger Docs server is running at http://localhost:${port}/docs`);
});
