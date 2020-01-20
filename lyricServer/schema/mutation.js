const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = graphql

const Song = require('../models/song')
const Lyric = require('../models/lyric')

const LyricType = require('./lyricType')
const SongType = require('./songType')

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title : {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, {title}) {        
        return Song.addSong(title)
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id : {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parentValue, {id} ){
        return Song.deleteSong(id)
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        id : {type: new GraphQLNonNull(GraphQLID)},
        content : {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, {id, content} ){
        return Song.addLyric(id, content)
      }
    },
    likeLyric: {
      type: LyricType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parentValue, {id}) {
        return new Promise(function (resolve, reject) {
          setTimeout(function() {
            return resolve(Lyric.like(id));
          }, 2000);
        });      
      }
    }
  }
})

module.exports = Mutation