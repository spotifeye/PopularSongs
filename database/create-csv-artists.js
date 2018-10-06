const faker = require('faker');
const fs = require('fs');
const artistsStream = fs.createWriteStream(__dirname + '/seed-artists.csv');

artistsStream.write('id,name\n');

var concatString = '';

for (let i = 10000000; i <= 10300000; i++) {
  let artist = {
    artistID: i,
    artistName: faker.name.findName()
  };

  if (concatString === '') {
    concatString = `${artist.artistID},${artist.artistName}\n`;
  } else {
    concatString += `${artist.artistID},${artist.artistName}\n`;
    if (i % 100 === 0) {
      artistsStream.write(concatString, function(err) {
        if (err) {
          console.log('error writing artist');
        } else {
          console.log(`wrote ${i - 10000000} artists`);
        }
      });
      concatString = '';
    }
  }
}
