require('newrelic');
const express = require('express');
// const cluster = require('cluster');
// const os = require('os');
// if (cluster.isMaster) {
//   const cpuCount = os.cpus().length;
//   for (i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }
// } else {
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

// POSSIBLE LOGGING
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

// POINTS TO LOCAL VERSION OF POSTGRES
// let pool = new Pool({
//   user: 'tecostello',
//   host: 'localhost',
//   database: 'spotify',
//   password: db.pgPass,
//   port: 5432,
//   max: 10
//   // this is a max of 10 connections
// });

// POINTS TO EC2 INSTANCE OF POSTGRES
let pool = new Pool({
  host: '13.56.188.4',
  database: 'spotifeye',
  port: '5432',
  user: 'power_user',
  password: '$poweruserpassword'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// WORKING WITH POSTMAN
app.get('/api/v1/artists/:id/popular-songs', function(req, res) {
  let artistID = req.params.id;
  console.log(req.params);
  console.log(artistID);

  pool.connect((err, client, done) => {
    if (err) {
      throw err;
    }

    client.query(
      `SELECT * FROM artists INNER JOIN albums ON artists.art_id = albums.artist_id INNER JOIN songs ON albums.alb_id = songs.albums_id WHERE artists.art_id = ${artistID} ORDER BY songs.popularity DESC LIMIT 10;`,
      (err, result) => {
        console.log('result:', result);
        done();

        if (err) {
          console.log('error is here', err.stack);
        } else {
          // logger.debug('Debug statement');
          // logger.info('Info statement');
          console.log('successful');
          res.status(200).json(result.rows);
        }
      }
    );
  });
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
// }

// cluster.on('exit', worker => {
//   console.log(`${worker.id} is no more`);
//   cluster.fork();
// });

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
