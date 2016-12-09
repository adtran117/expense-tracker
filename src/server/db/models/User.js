var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var expenseSchema = new Schema({
  date_created: { type: Date, default: Date.now },
  amount: Number,
  description: String,
});
var userSchema = new Schema({
  username: String,
  admin: Boolean,
  firstname: String,
  lastname: String,
  expenses: [expenseSchema],
});




var User = mongoose.model('User', userSchema);

module.exports = User;