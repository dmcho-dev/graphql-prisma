import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

/**
 * 55. Customizing Type Relationships
 */


// prisma.query prisma.mutation prisma.subscription prisma.exists


/**
 * exists // 존재하다
 * 존재하는지 확인하는 method
 */

//  prisma.exists.Comment({
//      id: "ck713wva200l00788kaa4vypz"
//  }).then(exists => {
//      console.log({exists})
//  })


/**
 * 1. Create a new Post
 * 2. Fetch all of the info about the user ( author )
 */

 const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })
    if(!userExists) {
        throw new Error("User not found")
    }

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
        author {
            id
            name
            email
            posts {
                id
                title
                published
            }
        }
    }`)

    return post.author
 }

//  createPostForUser("ck712hakd009h0788o2d83ea7", {
//      title: "Create from Function",
//      body: "Sample",
//      published: false,
//  })
//  .then(user => console.log({ user }))
//  .catch(error => {
//      console.log({ error })
//  })


/**
 * Goal: Improve updatePostForUser
 * 
 * 1. Use prisma.exists to verify that the post exists
 *      - If there is not post with that id, throw an error
 * 2. Remove the unnecessary user query by updating the selection set for updatePost
 * 3. Add a catch method call to catch and print errors
 * 4. Test your working by updating an existing post and a non-existent post.
 * 
 */

 const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId })
    if(!postExists) {
        throw new Error("Post not found")
    }

    const post = await prisma.mutation.updatePost({
        where: { id: postId }, data}, 
        `{ 
            author {
                id
                name
                email
                posts {
                    id
                    title
                    published
                }
            }
         }`)

    return post.author
 }

//  updatePostForUser("ck712uwgp00ea07885x41b9j8", {
//      published: true
//  })
//  .then(user => {
//      console.log(JSON.stringify(user, null, 2))
//  })
//  .catch(error => {
//      console.log({error})
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

