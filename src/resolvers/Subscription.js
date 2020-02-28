const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0
            setInterval(() => {
                count++
                return pubsub.publish('count', {
                    count
                })
            }, 1000)
            
            return pubsub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            console.log({postId, pubsub})
            const post = db.posts.find(post => post.id === postId && post.published )
            if(!post) {
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${post.id}`)
        }
    },
    post: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator('post')
        }
    }

}

export { Subscription as default }