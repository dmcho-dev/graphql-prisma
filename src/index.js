import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db'
import * as resolvers from './resolvers'
import './prisma'

// 40. Enums

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db,
        pubsub,
    }
})


server.start((e) => {
    console.log(`wow - The server is up!`);
})

