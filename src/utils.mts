import { readFileSync } from "fs"
import { buildSchema, GraphQLSchema } from "graphql"

export const loadSchema = (fileName: string): GraphQLSchema => {
    const sdlString = readFileSync(fileName, {
      encoding: "utf8",
    })
    return buildSchema(sdlString)
}
