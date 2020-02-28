import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists


// Query User List
prisma.query.users(null, `{ 
    id
    name 
    email
    posts {
        id
        title
    }
}`).then(users => {
    console.log(JSON.stringify({users}, null, 2))
}) 


// prisma.query.comments(null, `{
//     id
//     text
//     author {
//         id
//         name
//     }
// }`).then(comments => console.log(JSON.stringify({comments}, null, 2)))

// prisma.mutation.createPost({
//     data: {
//         title: "My new GraphQL post is live!",
//         body: "You can find the new course here",
//         published: true,
//         author: {
//             connect: {
//                 id: "ck712hakd009h0788o2d83ea7"
//             }
//         }
//     }
// }, `{
//     id
//     title
//     body
//     published
// }`).then(post => console.log(JSON.stringify({post}, null, 2)))

// prisma.mutation.updatePost({
//     where: {
//         id: "ck75uwr82001g0788yea0ozco"
//     },
//     data: {
//         title: "Changed Post",
//         body: "You can find the new course here",
//         published: false,
//     }
// }, `{
//     id
//     title
//     body
//     published
// }`).then(data => {
//     return prisma.query.posts(null, `{
//         id
//         title
//         body
//         published
//     }`)
// }).then(data => console.log(data))

