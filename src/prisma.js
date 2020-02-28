import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

/**
 * 53. Using Async/Await with Prisma Bindings
 */

/**
 * 1. Create a new Post
 * 2. Fetch all of the info about the user ( author )
 */

 const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, `{
        id
    }`)

    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, `{
        id
        name
        email
        posts {
            id
            title
            published
        }
    }`)

    return user
 }

//  createPostForUser("ck712hakd009h0788o2d83ea7", {
//      title: "Create from Function",
//      body: "Sample",
//      published: false,
//  }).then(user => console.log({user}))


/**
 * Goal: Use async/await with prisma-bindings
 * 
 * 1. Create "updatePostForUser" that accepts the post id and data to update
 * 2. Update the post (get author id back)
 * 3. Fetch the user associated with the updated post and return the user data
 *     - Grap the same fields gradded for createPostForUser
 * 4. Call the function with the id and data and use a then method call to get the user information
 * 5. Print the user info to the console and test your work
 */

 const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({where: { id: postId }, data}, `{ author { id} }`)

    const user = await prisma.query.user({where: { id: post.author.id }}, `{
        id
        name
        email
        posts {
            id
            title
            published
        }
    }`)

    return user
 }

//  updatePostForUser("ck712uwgp00ea07885x41b9j8", {
//      published: true
//  }).then(user => {
//      console.log(JSON.stringify(user, null, 2))
//  })










// Query User List
// prisma.query.users(null, `{ 
//     id
//     name 
//     email
//     posts {
//         id
//         title
//     }
// }`).then(users => {
//     console.log(JSON.stringify({users}, null, 2))
// }) 


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

