var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use( bodyParser.json() );


app.get('/api/users', function (req, res) {
  db.getAllUsers((err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});


app.post('/api/transfer', function (req, res) {
  db.updateTransferAmts(req.body.transferingID, req.body.transferingIDAmt , req.body.receivingID, req.body.receivingIDAmt , req.body.amount, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json({message: 'Success'});
    }
  });
});

const PORT = 3003;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});

