import { GraphQLServer } from "graphql-yoga";
import {v4 as uuidv4} from "uuid"

const users = [{
    id: "1",
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: "2",
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: "3",
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [
 
    {
        id:"1",
        title:"John Wick",
        body:"loreum Ipsum",
        published:true
    },
    {
        id:"2",
        title:"John Wick",
        body:"loreum Ipsum",
        published:true
    },

    {
        id:"3",
        title:"John Wick",
        body:"loreum Ipsum",
        published:true
    },

    {
        id:"4",
        title:"John Wick",
        body:"loreum Ipsum",
        published:true
    },

]


const comments = [
    {
    id:"1",
    text:"My",
}
,
{
    id:"2",
    text:"Name",
}
,   {
    id:"3",
    text:"is",
}
,   {
    id:"4",
    text:"john",
}
]


const typeDefs = `

type CommentType{
    id:ID!
    text:String!
}

type User{
    id:ID!
    name:String!
    email:String!
    age:Int
}

type PostQuery{
    id:ID!
    title:String!
    body:String!
    published:Boolean!
}

input InputUserType{
    name:String!
    email:String!
    age:Int
}

type Query{
    comment:[CommentType!]!
    grades:[Int!]!
    add(numbers:[Float!]!):Float!
    greeting(name: String!):String!
    users(query:String):[User!]!
    postquery:PostQuery!
}

type Mutation{
    createUser(data:InputUserType!):User!
    createPost(title:String!,body:String!,published:Boolean!):PostQuery!
    deleteUser(id:ID!):User
}
`;

const resolvers = {
    Query:{
        greeting(parent,args,ctx,info){
            if(args.name){
                console.log(args)

            }
        },
        add(parent,args,ctx,info){
            if(args.number.length === 0){
                return 0 
            }

            return args.number.reduce((acc,currentVal)=>{
                return acc + currentVal
            },0)
        },
        users(parent,args,ctx,info){
            // return[{
            //     id:1,
            //     name:"Mike",
            //     email:"Mike@gmail.com",
            // }]

            if(!args.query){
                return users
            }

            return users.filter((user)=>{
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        grades(parent,args,ctx,info){
            return [11,22,33];
        },
        postquery(){
            // return {
            //     id:1,
            //     title:"John Wick",
            //     body:"Loreum Ipsum",
            //     published:"false"
            // }
            return posts
        },
        comment(){
            return comments
        }
    },
    Mutation:{
       createUser(parent,args,ctx,info){
        const emailTaken = users.some((user) => user.email === args.email)

        if(emailTaken){
            throw new Error("Email Taken")
        }

        const user = {
            id:uuidv4(),
            ...args.data
        }
        users.push(user)
        return user;
       },
       deleteUser(parent,args,ctx,info){

        return users = users.filter((e)=>{
            return e.id !== args.id
        })

       }
       ,
       createPost(parent,args,ctx,info){
        // const post = {
        //     id:uuidv4(),
        //     title:args.title,
        //     body:args.body,
        //     published:args.published,

        // }
        const post = {
            id:uuidv4(),
            ...args
        }

        posts.push(post)
        return post;
    }
    },
 
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is up");
});
