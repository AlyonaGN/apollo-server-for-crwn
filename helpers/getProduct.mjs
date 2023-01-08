export const getProductByCategoryAndId = async (categoryId, productId, db) => {
    const ref = db.collection('categories').doc(categoryId)
    const category = await ref.get()
    if (!category.exists) {
        throw new GraphQLError('Invalid argument value', {
            extensions: {
                code: 'BAD_USER_INPUT',
                argumentName: 'id'
            }
        })
    } else {
        console.log(category.data())
        const product = category.data().items.find(item => item.id == productId)
        return product
    }
}