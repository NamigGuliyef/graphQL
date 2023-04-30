import express from "express";
import { graphqlHTTP } from "express-graphql";
import { connect } from "mongoose";
import schema from "./user.graphql";
import rootValue from "./user.root";
connect("mongodb+srv://node01:node01@cluster0.aeevlra.mongodb.net/?retryWrites=true&w=majority")
const app = express();
app.use("/", graphqlHTTP({ schema, rootValue, graphiql: true }));
app.listen(5020, () => console.log("server is up ...."));
