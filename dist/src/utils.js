import { readFileSync } from "fs";
import { buildSchema } from "graphql";
module.exports = (fileName) => {
    const sdlString = readFileSync(fileName, {
        encoding: "utf8",
    });
    return buildSchema(sdlString);
};
