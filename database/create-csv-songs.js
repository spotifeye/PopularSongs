const faker = require('faker');
const fs = require('fs');
const songsStream = fs.createWriteStream(__dirname + '/seed-songs.csv');

songsStream.write('id,name,streams,length,popularity,library,album_id\n');

var startingSongId = 1;
var startingAlbumId = 1;
var songNumber = 12;
var batchCounter = 0;
var concatString = '';

for (var i = 1; i <= 900000; i++) {
  for (let k = 0; k < songNumber; k++) {
    const song = {
      songID: startingSongId,
      songName: faker.lorem.words(5),
      streams: Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000, // streams between 50mm and 250mm
      length: Math.floor(Math.random() * (300 - 210 + 1)) + 210, // length between 5 min and 3.5 min
      popularity: Math.floor(Math.random() * 20) + 1, // popularity scale between 1 and 20 - used to select most popular songs
      library: faker.random.boolean(), // whether song has been added to users library
      albumID: startingAlbumId
    };
    startingSongId++;

    if (concatString === '') {
      concatString = `${song.songID},${song.songName},${song.streams},${song.length},${
        song.popularity
      },${song.library},${song.albumID}\n`;
      batchCounter++;
    } else {
      concatString += `${song.songID},${song.songName},${song.streams},${song.length},${
        song.popularity
      },${song.library},${song.albumID}\n`;
      batchCounter++;
    }
  }
  startingAlbumId++;

  if (batchCounter !== 0 && batchCounter % 300 === 0) {
    songsStream.write(concatString, function(err) {
      if (err) {
        console.log('error writing albums');
      } else {
        console.log('wrote songs');
      }
    });
    concatString = '';
    batchCounter = 0;
  }
}
