import { getProductByCategoryAndId } from "../helpers/getProduct.mjs"

export const mutationResolvers = {
    addToCart: async (parent, { userId, categoryId, productId }, { db }) => {
        const ref = db.collection('carts').doc(userId)
        let cart = await ref.get()
        let items
        const product = await getProductByCategoryAndId(categoryId, productId, db)
        if (!cart.exists) {
            items = [{ ...product, quantity: 1 }]
        } else {
            items = cart.data().items
            const cartItemIdx = items.findIndex(({ id }) => id === product.id)
            if (cartItemIdx >= 0) {
                items[cartItemIdx].quantity++
            } else {
                items.push({ ...product, quantity: 1 })
            }
        }

        await ref.set({ items })
        cart = await ref.get()
        return { id: cart.id, ...cart.data() }
    },
    removeFromCart: async (parent, { userId, productId }, { db }) => {
        const ref = db.collection('carts').doc(userId)
        let cart = await ref.get()
        let { items } = cart.data()
        const cartItemIdx = items.findIndex(({ id }) => id === productId)
        if (items[cartItemIdx].quantity === 1) {
            items = items.filter(({ id }) => id !== productId)
        } else {
            items[cartItemIdx].quantity--
        }

        await ref.set({ items })
        cart = await ref.get()
        return { id: cart.id, ...cart.data() }
    },
    clearCartItem: async (parent, { userId, productId }, { db }) => {
        const ref = db.collection('carts').doc(userId)
        let cart = await ref.get()
        let { items } = cart.data()
        items = items.filter(({id}) => id !== productId)

        await ref.set({ items })
        cart = await ref.get()
        return { id: cart.id, ...cart.data() }
    },

}