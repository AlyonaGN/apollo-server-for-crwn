import { mutationResolvers } from "./Mutation.mjs";
import { queryResolvers } from "./Query.mjs";

export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
}
