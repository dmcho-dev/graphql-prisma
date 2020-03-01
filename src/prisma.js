import { Prisma } from 'prisma-binding'

/**
 * 66. Closing Prisma to the Outside World
 */

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'thisismysupersecrettext'
})

 export { prisma as default }

