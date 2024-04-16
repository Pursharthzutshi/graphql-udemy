async // import {GraphQLServer} from "graphql-yoga";
const  startStandaloneServer = require ("@apollo/server/standalone")
const ApolloServer =require( "@apollo/server")

const GraphQLServer = require("graphql")


const typeDefs = `
type Query{
    title:String!
    name:String!
}
`

const resolvers = {
    Query:{
        title(){
            return 2;
        },

        name(){
            return "Pursharth"
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server,{
    listen:{port:4000}
})
