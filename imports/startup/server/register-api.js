import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';
///shos

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolver from '../../api/resolutions/resolvers';
import GoalsSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolver from '../../api/users/resolvers';

const typeDefs = [GoalsSchema, ResolutionsSchema, UsersSchema];
const resolvers = merge(GoalsResolvers, ResolutionsResolver, UsersResolver);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

createApolloServer({ schema });
