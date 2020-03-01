import { Prisma } from 'prisma-binding'

/**
 * 67. Allowing for Generated Schemas
 */

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'thisismysupersecrettext'
})

 export { prisma as default }

