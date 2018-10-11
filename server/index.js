require('newrelic');
const express = require('express');
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const bodyParser = require('body-parser');
  const path = require('path');
  const cors = require('cors');
  const db = require('../config/keys');
  const app = express();
  const { Pool } = require('pg');
  // const morgan = require('morgan');
  // const logger = require('./logger');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../public/')));

  // app.use(
  //   morgan('dev', {
  //     skip: function(req, res) {
  //       return res.statusCode < 400;
  //     },
  //     stream: process.stderr
  //   })
  // );

  // app.use(
  //   morgan('dev', {
  //     skip: function(req, res) {
  //       return res.statusCode >= 400;
  //     },
  //     stream: process.stdout
  //   })
  // );

  let pool = new Pool({
    host: '13.56.188.4',
    database: 'spotifeye',
    port: '5432',
    user: 'power_user',
    password: '$poweruserpassword'
  });

  // let pool = new Pool({
  //   user: 'tecostello',
  //   host: 'localhost',
  //   database: 'spotify',
  //   password: db.pgPass,
  //   port: 5432,
  //   max: 10
  //   // this is a max of 10 connections
  // });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  app.get('/loaderio-9f6b3e42e3fa57d62e93f163cdf2832c', function(req, res) {
    res.status(200).send('loaderio-9f6b3e42e3fa57d62e93f163cdf2832c');
  });

  // WORKING WITH POSTMAN
  app.get('/api/v1/artists/:id/popular-songs', function(req, res) {
    //   let artistID = parseInt(req.params.id, 10);
    //   let schema = `SELECT * FROM artists
    // INNER JOIN albums ON artists.id = albums.artist_id
    // INNER JOIN songs ON albums.id = songs.albums_id
    // WHERE artists.id=${artistID};`;
    // ORDER BY songs.popularity DESC
    // LIMIT 10;
    let artistID = parseInt(req.params.id, 10);

    pool.connect((err, client, done) => {
      if (err) {
        throw err;
      }
      client.query(
        `SELECT * FROM artists INNER JOIN albums ON artists.id = albums.artist_id INNER JOIN songs ON albums.id = songs.albums_id WHERE artists.id = ${artistID};`,
        (err, result) => {
          done();

          if (err) {
            console.log(err.stack);
          } else {
            // logger.debug('Debug statement');
            // logger.info('Info statement');
            res.status(200).json(result.rows);
            // console.log(result.rows[0]);
          }
        }
      );
    });

    // USING PROMISES
    // pool.connect().then(client => {
    //   let artistID = parseInt(req.params.id, 10);
    //   return client
    //     .query(
    //       `SELECT * FROM artists
    //     INNER JOIN albums ON artists.id = albums.artist_id
    //     INNER JOIN songs ON albums.id = songs.albums_id
    //     WHERE artists.id=${artistID};`
    //     )
    //     .then(res => {
    //       client.release();
    //       res.status(200).json(artist.rows);
    //     })
    //     .catch(err => {
    //       client.release();
    //       err.status(500);
    //       console.log(err.stack);
    //     });
    // });

    // ORIGINAL IMPLEMENTATION
    // pool
    //   .query(schema)
    //   .then(artist => res.status(200).json(artist.rows))
    //   .catch(err => console.log(err));
  });

  // WORKING WITH POSTMAN
  app.post('/api/v1/artists/:id/popular-songs', function(req, res) {
    console.log(req.body);
    let schema = `INSERT INTO songs(id,name,streams,length,popularity,library,albums_id) VALUES (
    ${req.body.id},'${req.body.name}',${req.body.streams},${req.body.length},${
  req.body.popularity
},${req.body.library},${req.body.albums_id});`;

    pool
      .query(schema)
      .then(() => res.status(201).send(String('artist successfully added')))
      .catch(err => console.log(err));
  });

  //WORKING WITH POSTMAN
  app.delete('/api/v1/artists/:id/popular-songs', function(req, res) {
    console.log(req.body);
    let schema = `DELETE FROM songs WHERE id=${req.body.song_id};`;
    pool
      .query(schema)
      .then(() => res.status(202).send(String('artist successfully deleted')))
      .catch(err => console.log(err));
  });

  //WORKING WITH POSTMAN
  app.put('/api/v1/artists/:id/popular-songs', function(req, res) {
    console.log(req.body);
    let schema = `UPDATE songs SET name = '${req.body.name}' WHERE id=${req.body.id};`;
    pool
      .query(schema)
      .then(() => res.status(200).send(String('artist successfully updated')))
      .catch(err => console.log(err));
  });

  const PORT = 3003;

  app.listen(PORT, function() {
    console.log(`listening on port ${PORT}!`);
  });
}

cluster.on('exit', worker => {
  console.log(`${worker.id} is no more`);
  cluster.fork();
});

// ------------------- PREVIOUS (MONGO) ---------------------------

// WORKING w/ Postman
// app.delete('/api/v1/artists/:id/popular-songs/:id', function(req, res) {
//   let artistID = parseInt(req.params.id, 10);
//   // console.log(artistID) --> returns the first number in the endpoint (artist Id)
//   Artist.deleteOne({ id: artistID })
//     .then(() => res.status(202).send(String('artist successfully deleted')))
//     .catch(err => console.log(err));
// });

// WORKING w/ Postman
// includes a request body
// app.post('/api/v1/artists/:id/popular-songs', function(req, res) {
//   // this is assuming that the req.body is an object with all of the artist information
//   Artist.create(req.body)
//     .then(() => res.status(201).send(String('artist successfully added')))
//     .catch(err => console.log(err));
// });

// WORKING w/ Postman
// put is a complete replacement, patch is a partial replacement
// includes a request body
// app.put('/api/v1/artists/:id/popular-songs', function(req, res) {
//   let artistID = parseInt(req.params.id, 10);
//   Artist.findOneAndUpdate({ id: artistID }, req.body)
//     .then(() => res.status(200).send(String('artist successfully updated')))
//     .catch(err => console.log(err));
// });

// MONGO: WORKING w/ Postman
// app.get('/api/v1/artists/:id/popular-songs', function(req, res) {
//   let artistID = parseInt(req.params.id, 10);
//   console.log(artistID);
//   Artist.findOne({ id: artistID })
//     .then(artist => res.status(200).json(artist))
//     .catch(err => console.log(err));
// });
