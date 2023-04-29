import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./user.schema";
import rootValue from "./user.root";
const app = express();
app.use("/", graphqlHTTP({ schema, rootValue, graphiql: true }));
app.listen(5020, () => console.log("server is up ...."));
