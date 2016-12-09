var mongoose = require('mongoose');

var Schema = mongoose.Schema;



var expenseSchema = new Schema({
  date_created: { type: Date, default: Date.now },
  amount: Number,
  description: String,
});


var Expense = mongoose.model('Expense', expenseSchema);


module.exports = Expense;
