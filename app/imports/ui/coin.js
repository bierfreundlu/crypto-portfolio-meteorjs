import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './coin.html';

Template.coin.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('coins.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('coins.remove', this._id);
  },
});
