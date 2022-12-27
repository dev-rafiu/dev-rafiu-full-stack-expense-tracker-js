const Expense = require("../models/Expense");

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(201).json({ expenses });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createNewExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id: expenseID } = req.params;
    const expense = await Expense.findOne({ _id: expenseID });
    if (!expense) {
      return res.status(404).json({ msg: `No expense with id: ${expenseID}` });
    }

    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id: expenseID } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: expenseID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!expense) {
      return res.status(404).json({ msg: `No task with id: ${expenseID}` });
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id: expenseID } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: expenseID });
    if (!expense) {
      return res.status(404).json({ msg: `No expense with id: ${expenseID}` });
    }
    res.status(200).json({ expense });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllExpenses,
  createNewExpense,
  getExpense,
  updateExpense,
  deleteExpense,
};
