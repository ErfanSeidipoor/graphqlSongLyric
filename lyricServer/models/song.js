const mongoose = require('mongoose');
const Lyric = require('./lyric') 

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title:  String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: 'lyric'
  }]
});

SongSchema.statics.addSong = function(title) {
  return this.create({title,})
  .then(song=> song)
}

SongSchema.statics.deleteSong = function(_id) {
  return this.findOneAndRemove({_id})
}
SongSchema.statics.addLyric = function(id, content) {
  return this.findById(id)
  .then(song=>{
    
    const lyric = new Lyric({ song , content })
    song.lyrics.push(lyric)
    return Promise.all([ lyric.save(), song.save() ])
    .then(([lyric, song])=>song)
  })
}

SongSchema.statics.findLyrics = function(id) {
  return this.findById(id)
    .populate('lyrics')
    .then(song=>song.lyrics)
}

module.exports = mongoose.model('song', SongSchema)


