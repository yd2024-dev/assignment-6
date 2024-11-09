import Koa from 'koa'
import cors from '@koa/cors'
import qs from 'koa-qs'
import zodRouter from 'koa-zod-router'
import { setupBookRoutes } from './src/books'
import { RegisterRoutes } from './build/routes'
import swagger from './build/swagger.json'
import KoaRouter from '@koa/router'
import { koaSwagger } from 'koa2-swagger-ui'
import bodyParser from 'koa-bodyparser'
import { type Server, type IncomingMessage, type ServerResponse } from 'http'
import { type AppBookDatabaseState, getBookDatabase } from './src/database_access'
import { type AppWarehouseDatabaseState, getDefaultWarehouseDatabase } from './src/warehouse/warehouse_database'

export default async function (port?: number, randomizeDbs?: boolean): Promise<{ server: Server<typeof IncomingMessage, typeof ServerResponse>, state: AppBookDatabaseState & AppWarehouseDatabaseState }> {
  const bookDb = getBookDatabase(randomizeDbs === true ? undefined : 'mcmasterful-books')
  const warehouseDb = await getDefaultWarehouseDatabase(randomizeDbs === true ? undefined : 'mcmasterful-warehouse')

  const state: AppBookDatabaseState & AppWarehouseDatabaseState = {
    books: bookDb,
    warehouse: warehouseDb
  }

  const app = new Koa<AppBookDatabaseState & AppWarehouseDatabaseState, Koa.DefaultContext>()

  app.use(async (ctx, next): Promise<void> => {
    ctx.state = state
    await next()
  })

  // Enable complex query string parsing
  qs(app)

  // CORS configuration
  app.use(cors())

  // Create router instance
  const router = zodRouter({ zodRouter: { exposeRequestErrors: true } })

  // Set up book routes
  setupBookRoutes(router, state.books)

  // Use body parser
  app.use(bodyParser())

  // Register the routes
  app.use(router.routes())

  // Set up Swagger UI
  const koaRouter = new KoaRouter()
  RegisterRoutes(koaRouter)
  app.use(koaRouter.routes())

  app.use(koaSwagger({
    routePrefix: '/docs',
    specPrefix: '/docs/spec',
    exposeSpec: true,
    swaggerOptions: {
      spec: swagger
    }
  }))

  // Start the server on port 3000 or the provided port
  return {
    server: app.listen(port, '0.0.0.0', () => {
      console.log('Server is listening on port', port)
    }),
    state
  }
}
