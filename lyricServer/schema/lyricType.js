const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql

const Lyric = require('../models/lyric')

const LyricType = new GraphQLObjectType({
  name: 'LyricType',
  fields: () => ({
    id: { type: GraphQLID},
    likes: {type: GraphQLInt },
    content: {type: GraphQLString},
    song: {
      type: require('./songType'),
      resolve( parentValue, args) {
        return Lyric.getSong(parentValue.id)
      }
    }
  }),
})

module.exports = LyricType;
