const express = require("express");
const router = express.Router();

const {
  getAllExpenses,
  createNewExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/methods");

router.route("/").get(getAllExpenses).post(createNewExpense);
router.route("/:id").get(getExpense).patch(updateExpense).delete(deleteExpense);

module.exports = router;
