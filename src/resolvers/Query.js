
/**
 * 61. Refactoring Custom Type Resolvers
 */

 /**
  * Goal: Convert the comments query over to Prisma
  * 
  * 1. Modify the comments query to fetch data from prisma
  * 2. Modify code to allow for relational requests when comments query
  * 3. Test your work by performing a few different queries
  * 
  */

const Query = {
    users(parent, args, { prisma }, info) {
        console.log({args})
        const opArgs = {}
        if(args.query) {
            opArgs.where = {
                OR: [
                    { name_contains: args.query },
                    { email_contains: args.query },
                ]
            }
        }

        return prisma.query.users(opArgs, info)

    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {}
        if(args.query) {
            opArgs.where = {
                OR: [
                    { title_contains: args.query },
                    { body_contains: args.query },
                ]
            }
        }
        return prisma.query.posts(opArgs, info)

    },
    comments(parent, args, { prisma }, info) {
        const opArgs = {}
        if(args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }

        return prisma.query.comments(opArgs, info)
    },
    me() {
        return {
            id: "123123",
            name: "Mike",
            email: "sample@gmail.com",
            age: 29
        }
    },
}

export { Query as default }