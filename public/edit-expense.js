const expenseId = document.querySelector(".expense-id");
const expenseNameDOM = document.querySelector(".expense-name");
const expenseAmountDOM = document.querySelector(".expense-amount");

const editForm = document.querySelector(".edit-expense-form");
const editBtnDOM = document.querySelector(".edit-expense-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;

const id = new URLSearchParams(params).get("id");
let tempName;

const showExpense = async () => {
  try {
    const {
      data: { expense },
    } = await axios.get(`/api/v1/expenses/${id}`);
    const { _id: expenseID, expenseName, expenseAmount } = expense;

    expenseId.textContent = expenseID;

    expenseNameDOM.value = expenseName;

    expenseAmountDOM.value = expenseAmount;

    tempName = expenseName;
  } catch (error) {
    console.log(error);
  }
};
showExpense();

editForm.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const name = expenseNameDOM.value;
    const amount = expenseAmountDOM.value;

    const {
      data: { expense },
    } = await axios.patch(`/api/v1/expenses/${id}`, {
      expenseName: name,
      expenseAmount: amount,
    });

    const { _id: expenseID, expenseName, expenseAmount } = expense;
    expenseId.textContent = expenseID;
    expenseNameDOM.value = expenseName;
    expenseAmountDOM.value = expenseAmount;
    // tempName = expenseName;
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `edited sucessfully`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    expenseNameDOM.value = tempName;
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "Edit";

  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
