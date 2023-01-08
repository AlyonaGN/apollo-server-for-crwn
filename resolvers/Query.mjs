import { GraphQLError } from "graphql"

export const queryResolvers = {
    categories: async (parent, args, { db }) => {
        const snapshot = await db.collection('categories').get()
        const data = []
        snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
        return data
    },
    getCategoryById: async (parent, { id }, { db }) => {
        const ref = db.collection('categories').doc(id)
        const category = await ref.get()
        if (!category.exists) {
            throw new GraphQLError('Invalid argument value', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    argumentName: 'id'
                }
            })
        } else {
            return {id: category.id, ...category.data()}
        }
    },
    getCart: async (parent, { userId }, { db }) => {
        const ref = db.collection('carts').doc(userId)
        const cart = await ref.get()
        return cart.exists ? {id: cart.id, ...cart.data()} : {id: userId, items: []}
    } 
}

