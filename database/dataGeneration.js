const faker = require('faker');
const mongoose = require('mongoose');
const Artist = require('./SchemaModes');

mongoose
    .connect('mongodb://localhost:27017/seed', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//100 3 7

for (var i = 1; i <= 2; i++) {

  let objA = {
    id: i,
    name: faker.lorem.word(),
    albums: [] 
  }

  for(var j = 1; i <= 2; i++) {
    let objB = {
      id: j,
      name: faker.lorem.words(),
      img: "https://loremflickr.com/320/240", 
      publish: Math.floor((Math.random() * 2018) + 1990),
      songs: []
    }

    for(var k = 1; i <= 2; i++) {
      let objC = {
        id: k,
        name: faker.lorem.words(),
        streams: Math.floor((Math.random() * 250000000) + 50000000),
        length: Math.floor((Math.random() * 300) + 210),
        popularity: Math.floor((Math.random() * 20) + 1),
        library: Boolean(Math.round(Math.random()))
      }

      objB.songs.push(objC);

    }

    objA.albums.push(objB);

  }

  Artist.create(objA, function (err, data) {
    if (err){
      console.log('error');
    } else {
      console.log('success');
    }
  });

}

/*

  id: Number, 
  name: String,
  albums: [{
    id: Number, 
    name: String, 
    img: Sring,
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

*/
