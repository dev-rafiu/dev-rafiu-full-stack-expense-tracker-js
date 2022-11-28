const taskIDDOM = document.querySelector(".task-edit-id");
const expenseNameDOM = document.querySelector(".task-edit-name");
const expenseAmountDom = document.querySelector(".expense-edit-amount");
// const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
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

    taskIDDOM.textContent = expenseID;

    expenseNameDOM.value = expenseName;

    expenseAmountDom.value = expenseAmount;

    tempName = expenseName;
  } catch (error) {
    console.log(error);
  }
};

showExpense();

editFormDOM.addEventListener("submit", async (e) => {
  console.log(200);
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const name = expenseNameDOM.value;
    const amount = expenseAmountDom.value;

    const {
      data: { expense },
    } = await axios.patch(`/api/v1/expenses/${id}`, {
      expenseName: name,
      expenseAmount: amount,
    });

    const { _id: expenseID, expenseName, expenseAmount } = expense;

    taskIDDOM.textContent = expenseID;

    expenseNameDOM.value = expenseName;

    expenseAmountDom.value = expenseAmount;

    tempName = expenseName;
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited task`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
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
