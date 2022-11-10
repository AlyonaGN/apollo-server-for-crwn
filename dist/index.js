import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { config } from './config';
import { firebaseDB } from './db';
import { loadSchema } from './utils';
import expressPlayground from 'graphql-playground-middleware-express';
import { resolvers } from './resolvers';
async function start() {
    const app = express();
    const db = firebaseDB.firestore();
    const context = { db };
    const server = new ApolloServer({
        typeDefs: loadSchema("src/schema.graphql"),
        resolvers,
        context
    });
    await server.start();
    server.applyMiddleware({ app });
    app.get('/', (req, res) => res.end('Welcome to the CrownClothingAPI'));
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }));
    app.listen({ port: config.port }, () => console.log(`GraphQL Server running @ http://localhost:${config.port}${server.graphqlPath}`));
}
start();
