const { GraphQLError } = require('graphql');
export const queryResolvers = {
    collections: async (parent, args, { db }) => {
        const snapshot = await db.collection('categories').get();
        const data = [];
        snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    },
    collection: async (parent, { id }, { db }) => {
        const ref = db.collection('categories').doc(id);
        const collection = await ref.get();
        if (!collection.exists) {
            throw new GraphQLError('Invalid argument value', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    argumentName: 'id'
                }
            });
        }
        else {
            return collection.data();
        }
    },
    getCollectionByTitle: async (parent, { title }, { db }) => {
        const ref = db.collection('categories');
        const snapshot = await ref.where('title', '==', title).get();
        if (snapshot.empty) {
            throw new GraphQLError('No collection found', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    argumentName: 'title'
                }
            });
        }
        else {
            const [collection] = snapshot.docs;
            return { id: collection.id, ...collection.data() };
        }
    }
};
