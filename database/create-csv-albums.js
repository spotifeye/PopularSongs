const faker = require('faker');
const fs = require('fs');
const albumsStream = fs.createWriteStream(__dirname + '/seed-albums.csv');

albumsStream.write('id,name,img,artist_id\n');

var startingArtistId = 10000000;
var albumNumber = 3;
var startingAlbumId = 1;
var batchCounter = 0;
var concatString = '';

for (var i = 1; i <= 300000; i++) {
  var t = Math.floor(Math.random() * 1000);

  for (var j = 0; j < albumNumber; j++) {
    const album = {
      albumID: startingAlbumId,
      albumName: faker.random.words(),
      img: `https://s3-us-west-1.amazonaws.com/spotifeye-images/${t}.jpg1`,
      artistID: startingArtistId
    };
    startingAlbumId++;

    if (concatString === '') {
      concatString = `${album.albumID},${album.albumName},${album.img},${album.artistID}\n`;
      batchCounter++;
    } else {
      concatString += `${album.albumID},${album.albumName},${album.img},${album.artistID}\n`;
      batchCounter++;
    }
  }
  startingArtistId++;

  if (batchCounter !== 0 && batchCounter % 300 === 0) {
    albumsStream.write(concatString, function(err) {
      if (err) {
        console.log('error writing albums');
      } else {
        console.log(`wrote ${i * 3} albums`);
      }
    });
    concatString = '';
    batchCounter = 0;
  }
}
