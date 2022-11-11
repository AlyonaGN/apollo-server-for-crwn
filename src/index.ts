import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { config } from './config.mjs';
import { firebaseDB } from './db.mjs';
import { loadSchema } from './utils.mjs';
import { resolvers } from './resolvers/index.mjs';
import dotenv from 'dotenv';
/* import expressPlayground from 'graphql-playground-middleware-express' */

dotenv.config()


async function start() {
  const app = express()

  const db = firebaseDB.firestore()
  const context = { db }

  const server = new ApolloServer({
      typeDefs: loadSchema("src/schema.graphql"),
      resolvers,
      context
  })
  await server.start()
  server.applyMiddleware({ app })
  console.log(config)

  app.get('/', (req, res) => res.end('Welcome to the CrownClothingAPI'))
  /* app.get('/playground', expressPlayground.default({ endpoint: '/graphql' })) */
  app.listen({ port: config.port }, () =>
      console.log(
          `GraphQL Server running @ http://localhost:${config.port}${server.graphqlPath}`
      )
  )
}

start()


