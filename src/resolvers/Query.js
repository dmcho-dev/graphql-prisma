
/**
 * 60. Integrating Operation Argument
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
    comments(parent, args, { db }, info) {
        return db.comments
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