import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Transactions = new Mongo.Collection('transactions');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find();
  });
}

Meteor.methods({
  'transactions.insert'(transaction) {
      // IMPLEMENT CHECKS
      console.log(check(transaction.coin, String));
      //check(quantity, Number);


      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      console.log(data);
      /*Transactions.insert({
        price: data['price'],
        quantity: data['quantity'],
        fee: data['fee'],
        coin: data['data'],
        createdAt: new Date(),
        owner: Meteor.userId(),
      });
      */
    },
    'transactions.remove'(taskId) {
      check(taskId, String);

      Transactions.remove(taskId);
    },
});


/*
if (Meteor.isServer) {
  console.log('server');
  Coins.insert([
      {
        icon: "https://lh3.googleusercontent.com/0Rffsb2qE9NRhQv4hPe8achHqCxBiMRnPZLI9lSt_u3c7p1-R1Es7OlH0dQFlRSAGw=w150",
        name: 'Bitcoin | BTC',
        holding: 0.11,
        value: '$110',
        profit: '$32',
        price: '$12.000',
        deltaDay: +5.23,
    },
    {
        icon: 'https://cdn4.iconfinder.com/data/icons/modern-future-technology/128/crystal-ether-24.png',
        name: 'Ether | ETH',
        holding: 1.26,
        value: '$1.403',
        profit: '$213',
        price: '$6.473',
        deltaDay: -32.45,
    }
  ]);
}
console.log(Coins.find());
*/
