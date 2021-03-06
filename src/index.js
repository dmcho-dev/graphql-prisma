import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db'
import * as resolvers from './resolvers'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
        db,
        pubsub,
        prisma,
    }
})

server.start((e) => {
    console.log(`wow - The server is up!`);
})

