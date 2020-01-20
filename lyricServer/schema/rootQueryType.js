// const mongoose = require('mongoose')
const graphql = require('graphql')
const LyricType = require('./lyricType')
const SongType = require('./songType')
const Lyric = require('../models/lyric')
const Song = require('../models/song')

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType
} = graphql


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: ()=>({
    song: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValue, args) {
        return Song.findById(args.id)
          .then(song=> song)
      }
    },
    songs:{
      type: new GraphQLList(SongType),
      resolve(parentValue, args) {
        return Song.find({})
      }
    },
    lyric: {
      type: LyricType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValue, args) {
        return Lyric.findById(args.id)
        .then( lyric=> lyric)
      }
    }
  })
})

module.exports = RootQuery