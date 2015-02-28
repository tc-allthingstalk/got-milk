var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Got Milk?', pun: randomPun() });
});

function randomPun() {

  var puns = [
    'Leaves you wanting mooo-re!',
    'Udderly amazing!',
    // 'Vitamins, you don\'t want to lactose',
    'Milk-stash-tic!',
    'You should have an udder one',
    'I dairy you to drink mooo-re',
    'You will cow-l for more',
    'Cow-nting down to zero',
    'Pour some in your decalf coffee',
    'Mmh, ice cow-ld!',
    'Legen-dairy stuff',
    'Cow-dy partner',
    'Minimum veal-able product',
  ];

  var puns_empty = [
    'I’m dairy sorry, but you’re out of milk',
    'No whey, you finished the whole bottle!',
    'Better cream for a refill!',
  ];

  var rand = Math.floor(Math.random() * puns.length);
  return puns[rand];
}

module.exports = router;
