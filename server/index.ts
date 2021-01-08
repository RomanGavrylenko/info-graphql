import { gql, ApolloServer, makeExecutableSchema } from "apollo-server";
import  mongoose from 'mongoose';
import User from '../models/user';
import { MONGODB } from '../config';
const PORT = process.env.port || 5000;

const typeDefs = gql`
    type User {
        id: Int
        username: String
        password: String
        email: String
        createdAt: String
    }

    type Query {
        getUser: User
    }
`;

const resolvers = {
    Query: {
        async getUser() {
            return await User.findOne();
        }
    }
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect( MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res}`);
  })
  .catch(err => {
    console.error(err)
  })