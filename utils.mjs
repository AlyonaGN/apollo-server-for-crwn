import { readFileSync } from "fs"
import { buildSchema } from "graphql"

export const loadSchema = (fileName) => {
    const sdlString = readFileSync(fileName, {
      encoding: "utf8",
    })
    return buildSchema(sdlString)
}
