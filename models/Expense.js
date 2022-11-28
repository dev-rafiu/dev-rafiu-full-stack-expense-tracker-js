const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
  },
  expenseAmount: {
    type: Number,
    required: [true, "must provide amount"],
  },
  date: {
    type: Date,
    // required: [true, "must provide amount"],
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
