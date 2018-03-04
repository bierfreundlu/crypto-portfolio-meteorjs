import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Coins } from '../api/coins.js';
import { Transactions } from '../api/transactions.js';
import { ReactiveDict } from 'meteor/reactive-dict';

global.Buffer = require('buffer').Buffer;
import './body.html';
import './coin.js'
import './transaction.js'

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  console.log(Meteor.subscribe('coins'));
  console.log(Meteor.subscribe('transactions'));


  window.Coins= Coins;
});

Template.addTransactionForm.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.body.helpers({
  coins() {
    /*const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Coins.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    return Coins.find({}, {sort: { createdAt: -1 } });
    */

    // needs to transform the number to currecny style
    data = Coins.find({}, { sort: { rank: 1 } });
    //console.log(data)
    result = [];
    data.forEach((coin) => {
      let positive;
      coin['percent_change_24h'] >= 0 ? positive = true : positive = false;
      result.push({
        icon: coin['icon'],
        name: coin['name'],
        rank: coin['rank'],
        symbol: coin['symbol'],
        price_usd: numberToCurrency(coin['price_usd']),
        market_cap_usd: numberToCurrency(coin['market_cap_usd']),
        volume_usd: numberToCurrency(coin['volume_usd']),
        available_supply: numberToCurrency(coin['available_supply']),
        percent_change_24h: coin['percent_change_24h'],
        positive,
      });
    });
    return result;
  },
  errors() {
    const instance = Template.instance();
    if (instance.state.get('quantityInputError')) {
      var err = {
        quantityInputError: true,
        priceInputError: false,
      };
      return err;
    }
    var err = {
      quantityInputError: false,
      priceInputError: false,
    };
    return err;
  },
});

Template.welcomeNoUser.helpers({
  globalMarket() {
    const fetch = require('node-fetch');
    var result;
    console.log('hello');
    fetch('https://api.coinmarketcap.com/v1/global')
    .then(function (res) {
      console.log(2);
        res.json().then(function (data) {
            console.log(3);
            result = {'total_market_cap_usd': numberToCurrency(data['total_market_cap_usd'])};
          });
      });
      //console.log(result);
    return result;
  },
});

/*Template.body.events({
  'submit .new-coin'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.text.value;

    // Insert a task into the collection
    Meteor.call('coins.insert', name);
    // Clear form
    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
  instance.state.set('hideCompleted', event.target.checked);
},
'click .test-button'(event) {
  event.preventDefault();
  console.log('test button clicked');
  console.log(event);
  },
});
*/

function numberToCurrency(n) {
  return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

Template.addTransactionForm.events({
  'submit form'(event, instance) {
    event.preventDefault();
    console.log('form submitted');
    console.log(event);
    let data = event.target;

    //NEED TO FIGURE OUT HOW TO SET THE STATE OF THE BODY TEMPLATE TO DISPLAY AN ERROR IF THE INPUTED DATA DOESNT MATCH
    //console.log(Template.body.instance.state.set('quantityInputError', true));

    let transaction = {
      coin: data.coin.value,
      quantity: parseInt(data.quantity.value),
      price: parseInt(data.price.value),
      transactionDate: new Date(data.date.value),
      createdAt: new Date(),
    };
    Meteor.call('transactions.insert', transaction)
    console.log(transaction);
  },
});

Template.addTransactionForm.rendered=function() {
	$('#inputDate').datepicker();
}
