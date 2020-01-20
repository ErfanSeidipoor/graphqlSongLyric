const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LyricSchema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = function(id) {
  return this.findById(id)
  .then( lyric=>{
    lyric.likes = lyric.likes+1;
    return lyric.save()
  })
}

LyricSchema.statics.getSong = function(id) {
  return this.findById(id)
  .populate('song')
  .then( lyric =>  lyric.song)
}

module.exports = mongoose.model('lyric', LyricSchema);