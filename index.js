import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { config } from './config.mjs';
import { firebaseDB } from './db.mjs';
import { loadSchema } from './utils.mjs';
import { resolvers } from './resolvers/index.mjs';


async function start() {
  const app = express()

  const db = firebaseDB.firestore()
  const context = { db }

  const server = new ApolloServer({
      typeDefs: loadSchema("./schema.graphql"),
      resolvers,
      context,
      playground: {
        settings: {
          'editor.theme': 'light',
        }
      }      
  })
  await server.start()
  server.applyMiddleware({ app })
  console.log(config)

  app.get('/', (req, res) => res.end('Welcome to the CrownClothingAPI')),
  app.listen({ port: config.port }, () =>
      console.log(
          `GraphQL Server running @ http://localhost:${config.port}${server.graphqlPath}`
      )
  )
}

start()


