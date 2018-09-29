const faker = require('faker');
const fs = require('fs');
// const JSON2CSV = require('json2csv');
const artistsStream = fs.createWriteStream(__dirname + '/seed-artists.csv');
const albumsStream = fs.createWriteStream(__dirname + '/seed-albums.csv');
const songsStream = fs.createWriteStream(__dirname + '/seed-songs.csv');

artistsStream.write('id,name\n');
albumsStream.write('id,name,img,artist_id\n');
songsStream.write('id,name,streams,length,popularity,library,album_id\n');

let uniqueAlbumId = 1;
let uniqueSongId = 1000000;

// const artistGenerator = artist => {
//   artistsStream.write(`${artist.artistID},${artist.artistName}\n`, function(err, results){
//     if(err){
//       console.log('error writing artist')
//     } else {

//     }
//   }
// }

const artistGenerator = artist =>
  new Promise((resolve, reject) => {
    // artistsStream.write(`${artist.artistID},${artist.artistName}\n`, function(err) { artistsStream.end(); });
    artistsStream.write(`${artist.artistID},${artist.artistName}\n`, () => {
      artistsStream.end(resolve);
    });
  });

const albumGenerator = album =>
  new Promise((resolve, reject) => {
    albumsStream.write(
      `${album.albumID},${album.albumName},${album.img},${album.artistID}\n`,
      () => {
        albumsStream.end(resolve);
      }
    );
  });

const songGenerator = song =>
  new Promise((resolve, reject) => {
    songsStream.write(
      `${song.songID},${song.songName},${song.streams},${song.length},${song.popularity},${
        song.library
      },${song.albumID}\n`,
      () => {
        songsStream.end(resolve);
      }
    );
  });

const generateData = async () => {
  for (let i = 1; i <= 10; i++) {
    const artist = {
      artistID: i,
      artistName: faker.name.findName()
      // albums: []
    };
    // console.log(artist);
    await artistGenerator(artist);
    // artistGenerator(artist);

    const albumNumber = 3;
    let t = Math.floor(Math.random() * 1000);
    for (let j = 1; j < albumNumber + 1; j++) {
      const album = {
        albumID: uniqueAlbumId,
        albumName: faker.random.words(),
        img: `https://s3-us-west-1.amazonaws.com/spotifeye-images/${t}.jpg1`,
        artistID: i
        // songs: []
      };
      albumGenerator(album);
      // await albumGenerator(album);
      // albumsStream.write(`${album.albumID},${album.albumName},${album.img},${album.artistID}\n`);

      const songNumber = 12;
      for (let k = 1; k < songNumber + 1; k++) {
        const song = {
          songID: uniqueSongId,
          songName: faker.random.words(),
          streams: Math.floor(Math.random() * (250000000 - 50000000 + 1)) + 50000000, // streams between 50mm and 250mm
          length: Math.floor(Math.random() * (300 - 210 + 1)) + 210, // length between 5 min and 3.5 min
          popularity: Math.floor(Math.random() * 20) + 1, // popularity scale between 1 and 20 - used to select most popular songs
          library: faker.random.boolean(), // whether song has been added to users library
          albumID: uniqueAlbumId
        };
        uniqueSongId++;
        // artist.albums.songs.push(song);
        songGenerator(song);
        // await songGenerator(song);
        // await songsStream.write(
        //   `${song.songID},${song.songName},${song.streams},${song.length},${song.popularity},${
        //     song.library
        //   },${song.albumID}\n`
        // );
      }
      uniqueAlbumId++;
      // artist.albums.push(album);
    }
    // var fileContents = JSON2CSV(artist, header);
  }
};
generateData();
console.log('data creation finished');
