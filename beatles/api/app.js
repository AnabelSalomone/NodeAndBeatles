let express = require('express')
let datas = require('./datas.json')
let cors = require('cors')
let logger = require('morgan'); // permet d'utiliser des logs pour tracer dans la console

let app = express()
let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));
logger('tiny')
app.use(logger('dev'));


let bodyParser = require('body-parser');
let YouTube = require('youtube-node');
let youTube = new YouTube();
youTube.setKey('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');


//securisation de données en GET et POST
app.use(bodyParser.urlencoded({
  extended: false
})) //Données en GET encryptées
app.use(bodyParser.json()) // Données en POST encryptées

app.use(cors({
  origin: 'http://localhost:8080'
}));

/**
 * Erreur 500 sortie en JSON
 */
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
  let mot = req.params.mot; //req.params => permet derecuperer les parametres en URL
  console.log(mot);

  let tab = [];
  let reg = new RegExp(mot, "i");

  tab = datas.filter((elt) => reg.test(elt.tracks));
  res.json(tab);
});


//Route to song detail
app.get('/song/:song', (req, res) => {
  console.log(req.params.song);
  let song = req.params.song;
  res.json(song)
})


//GET A SONG
app.get('/video/:keyword', (req, res) => {
  console.log("llamando search");
  let keyword = 'Beatles ' + req.params.keyword
  console.log("Keyword: ", keyword);

  youTube.search(keyword, 1, function (error, result) {
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
