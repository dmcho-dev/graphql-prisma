/**
 * Goal: Modify posts query to return posts from the database
 * 
 * 1. Comment out existing code
 * 2. Use the correct prisma method
 *      - Ignore operation arguments for now
 * 3. Run the posts query on the Node.js GraphQL API to verify it works
 *      - Just ask for scalar fields
 * 
 */


const Query = {
    users(parent, args, { prisma }, info) {
        console.log({args, info})
        return prisma.query.users(null, info)

    },
    posts(parent, args, { prisma }, info) {
        return prisma.query.posts(null, info)

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