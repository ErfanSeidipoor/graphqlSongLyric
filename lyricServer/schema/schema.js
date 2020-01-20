
const rootQuery = require('./rootQueryType');
const Mutation = require('./mutation');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
