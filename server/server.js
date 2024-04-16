import {GraphQLServer} from "graphql-yoga";


const typeDefs = `
type Query{
    hello:String!
    name:String!
}
`

const resolvers = {
    Query:{
        hello(){
            return "Name"
        },
        name(){
            return "Name"
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(()=>{
    console.log("Server is upda")
})