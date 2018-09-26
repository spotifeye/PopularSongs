const express = require("express");
const bodyParser = require("body-parser");
const Artist = require("../database/index");
const path = require("path");
const cors = require("cors");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public/")));

// WORKING w/ Postman
app.get("/artist/:id", function(req, res) {
  let artistID = parseInt(req.params.id, 10);
  Artist.findOne({ id: artistID })
    .then(artist => res.status(200).json(artist))
    .catch(err => console.log(err));
});

// WORKING w/ Postman
app.delete("/artist/:id", function(req, res) {
  let artistID = parseInt(req.params.id, 10);
  Artist.deleteOne({ id: artistID })
    .then(() => res.status(202).send(String("artist successfully deleted")))
    .catch(err => console.log(err));
});

// WORKING w/ Postman
app.post("/artist/:id", function(req, res) {
  // this is assuming that the req.body is an object with all of the artist information
  Artist.create(req.body)
    .then(() => res.status(201).send(String("artist successfully added")))
    .catch(err => console.log(err));
});

// WORKING w/ Postman
app.put("/artist/:id", function(req, res) {
  let artistID = parseInt(req.params.id, 10);
  Artist.findOneAndUpdate({ id: artistID }, req.body)
    .then(() => res.status(200).send(String("artist successfully updated")))
    .catch(err => console.log(err));
});

const PORT = 3003;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
