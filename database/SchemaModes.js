const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
// const SongsSchema = new Schema({
//   id: Number,
//   name: String,
//   streams: Number,
//   length: Number, 
//   popularity: Number, 
//   library: Boolean
// });


// const AlbumsSchema = new Schema({
//   id: Number, 
//   name: String, 
//   img: { data: Buffer, contentType: String},
//   publish: Number, 
//   popularSongID: Number,
//   songs: { type: {SongsSchema}, required: true }
// });


const ArtistSchema = new Schema({
  id: Number, 
  name: String,
  albums: [{
    id: Number, 
    name: String, 
    img: { data: Buffer, contentType: String},
    publish: Number, 
    songs: [{
      id: Number,
      name: String,
      streams: Number,
      length: Number, 
      popularity: Number, 
      library: Boolean
    }]
  }]
});






// module.exports = Songs = mongoose.model('Songs', SongsSchema);
// module.exports = Albums = mongoose.model('Albums', AlbumsSchema);
module.exports = Artists = mongoose.model('Artists', ArtistSchema);
