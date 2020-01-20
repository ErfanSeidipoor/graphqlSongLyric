const Song = require('../models/song')
const graphql = require('graphql')
const LyricType = require('./lyricType')
const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
} = graphql

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: ()=> ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue, args) {
        return Song.findLyrics(parentValue.id)
          .then(lyrics=> lyrics)
      }
    },
  }),
})

module.exports = SongType