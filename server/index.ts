import { ApolloServer } from "apollo-server";
import  mongoose from 'mongoose';
import { resolvers } from '../graphql/resolver';
import { typeDefs } from '../graphql/typeDef';
import { MONGODB } from '../config';
const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect( MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Server running`);
  })
  .catch(err => {
    console.error(err)
  })