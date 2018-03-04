import { Meteor } from 'meteor/meteor';
import { Coins } from '../imports/api/coins.js';

Meteor.startup(() => {
  // code to run on server at startup
  //updateCoinsDB();
});

function updateCoinsDB() {
  var fetch = require('node-fetch');
  fetch('https://api.coinmarketcap.com/v1/ticker/?limit=5')
    .then(function (res){
      res.json().then(function(data) {
        for (entry in data) {
          let c = data[entry];
          c = objectStringToFloat(c);
          replaceObjectKey(c, 'volume_usd', '24h_volume_usd');
        /*  fs.readFile('../imports/ui/assets/icons/' + c.symbol + '.svg', function(err, data) {
            if (err) throw err;
            c['icon'] = data;
          });
          */
          c['icon'] = '../assets/icons/' + c.symbol + '.svg';
          if (!Coins.findOne({ id: c.id })) {
            console.log(c.id, 'added to the DB');

            Coins.insert(c);
          } else {
            console.log(c.id," To be updated");
            Coins.update({ id: c.id}, c);
          }
        }
      })
    }).catch(function(err) {
      console.log('Error: ', err);
    });
}

function objectStringToFloat(inputObject) {
	var outputObject = {};

	for (var key in inputObject) {
    	if (isNaN(parseFloat(inputObject[key]))) {
        	outputObject[key] = inputObject[key];
		} else {
        	outputObject[key] = parseFloat(inputObject[key]);
		}
	}
	return outputObject;
}

function replaceObjectKey(inputObject, newKey, oldKey) {
  inputObject[newKey] = inputObject[oldKey];
  delete inputObject[oldKey];
}
