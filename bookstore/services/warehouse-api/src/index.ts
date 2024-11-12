import Koa from 'koa';
import koaSwagger from 'koa2-swagger-ui';
import path from 'path';

const app = new Koa();
const port = 3000;

// Path to your Swagger JSON file
const swaggerJsonPath = path.join(__dirname, 'swagger.json');

// Swagger UI setup
app.use(koaSwagger({
  routePrefix: '/docs',  // Route to access Swagger UI
  swaggerOptions: {
    url: swaggerJsonPath, // Path to the swagger JSON file
  },
}));

// Your routes and other setup here...

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
