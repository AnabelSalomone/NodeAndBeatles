let express = require('express')
let datas = require('./datas.json')
let cors = require('cors')
let logger = require('morgan');
let app = express()
let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
logger('tiny')
app.use(logger('dev'));


let bodyParser = require('body-parser');
let YouTube = require('youtube-node');
let youTube = new YouTube();
youTube.setKey(/*your key*/); // PLEASE SET YOUR YOUTUBE KEY


//securisation de données en GET et POST
app.use(bodyParser.urlencoded({
  extended: false
})) //Données en GET encryptées
app.use(bodyParser.json()) // Données en POST encryptées

app.use(cors({
  origin: 'http://localhost:8080'
}));


app.use(function (error, request, response, next) {
  response.status(error.status || 500);
  response.json({
    error: error.message
  });
});


//DATA LOADING
app.get('/', function (req, res) {
  res.json(datas);
})


//SEARCH A SONG
app.get('/search/:mot?', function (req, res) {
  let mot = req.params.mot;

  let tab = [];
  let reg = new RegExp(mot, "i");

  tab = datas.filter((elt) => reg.test(elt.tracks));
  res.json(tab);
});


//Route to song detail
app.get('/song/:song', (req, res) => {
  let song = req.params.song;
  res.json(song)
})


//GET A SONG
app.get('/video/:keyword', (req, res) => {
  let keyword = 'Beatles ' + req.params.keyword

  youTube.search(keyword, 10, function (error, result) {
    if (error) {
      console.log('ERROR IN SEARCH LINE 58: ', error);
    } else {
      res.json(result);
    }
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
