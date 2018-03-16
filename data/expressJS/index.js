const express = require('express');
const app = express();
const Chance = require('chance');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
var chance = new Chance();
var highScore = 0;
var board;
app.get('/init', function (req, res) {
  var board1 = [];//init board1
  while ( board1.length < 10) {
    var card = chance.integer({min: 1, max: 10}); //generate random integer between 1, 10
    if (board1.indexOf(card) == -1) { //if number is not in array indexOf returns -1
      board1.push(card);
    }
  }
  var board2 = [];
  while ( board2.length < 10) {
    var card = chance.integer({min: 1, max: 10});
    if (board2.indexOf(card) == -1) {
      board2.push(card);
    }
  }
  board = board1.concat(board2);
  console.log(board);
  res.send(true);
});
app.post('/check', function(req, res) {
  res.send({
    response: board[req.body.number - 1],
  });
});
app.post('/updateScore', function(req, res) {
  console.log(req.body);
  if (highScore == 0) {
    highScore = req.body.score;
    res.send({
      victory: true,
      score: highScore,
    })
  } else if (highScore > req.body.score) {
    highScore = req.body.score;
    res.send({
      victory: true,
      score: highScore,
    });
  } else {
    res.send({
      victory: false,
      score: highScore,
    });
  }

});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
