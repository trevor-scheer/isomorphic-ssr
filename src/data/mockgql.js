import {makeExecutableSchema} from 'graphql-tools';

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

const users = [
  {
    id: 'ab12',
    name: 'J.K. Rowling'
  },
  {
    id: 'cd34',
    name: 'Michael Crichton'
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book], users: [User] }
  type Book { title: String, author: String }
  type User { id: ID, name: String }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    users: () => users
  }
};

// Put together a schema
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
