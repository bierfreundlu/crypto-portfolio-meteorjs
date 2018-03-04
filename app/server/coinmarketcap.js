import { Coins } from'../imports/api/coins.js';


export default class CoinMarketCap {
  getTicker(limit) {
    let fetch = require('node-fetch');
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=" + limit;
    var result = '';
    fetch(url)
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        this.addToCoins(json);
      });
    return result;
  }

  async getTick(limit) {
    let fetch = require('node-fetch');
    let url = "https://api.coinmarketcap.com/v1/ticker/?limit=" + limit;
    var respo = await fetch(url);
    let json = await respo.json();
    return json;
  }

  addToCoins(json) {
    for (entry in json) {
      Coins.insert(json[entry]);
    };
  }
}
