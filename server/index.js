require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../config/keys');
const app = express();
const { Pool } = require('pg');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

let pool = new Pool({
  user: 'tecostello',
  host: 'localhost',
  database: 'spotify',
  password: db.pgPass,
  port: 5432,
  max: 10
  // this is a max of 10 connections
});

// WORKING WITH POSTMAN
app.get('/api/v1/artists/:id/popular-songs', function(req, res) {
  let artistID = parseInt(req.params.id, 10);
  let schema = `SELECT * FROM artists 
  INNER JOIN albums ON artists.id = albums.artist_id 
  INNER JOIN songs ON albums.id = songs.albums_id
  WHERE artists.id=${artistID};`;
  // ORDER BY songs.popularity DESC
  // LIMIT 10;
  pool
    .query(schema)
    .then(artist => res.status(200).json(artist.rows))
    .catch(err => console.log(err));
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
