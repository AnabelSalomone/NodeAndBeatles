let express = require('express')
let datas = require('./datas.json')
let cors = require('cors')

let app = express()
let bodyParser = require('body-parser');


//securisation de données en GET et POST
app.use(bodyParser.urlencoded({ extended: false })) //Données en GET encryptées
app.use(bodyParser.json()) // Données en POST encryptées

app.use(cors({ origin: 'http://localhost:8080' }));

app.get('/', function (req, res) {
	res.json(datas);
})

app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
})