const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".expense-form");
const nameInput = document.querySelector(".name-input");
const amountInput = document.querySelector(".amount-input");
const formAlertDOM = document.querySelector(".form-alert");

const balance = document.querySelector(".balance");
const incomesList = document.querySelector(".incomes-list");
const expendituresList = document.querySelector(".expenditures-list");

const sidebar = document.querySelector(".sidebar");

const btnOpenSidebar = document.querySelector(".btn-open-sidebar");
const btnCloseSidebar = document.querySelector(".btn-close-sidebar");

btnOpenSidebar.addEventListener("click", () => {
  sidebar.classList.add("show-sidebar");
});

btnCloseSidebar.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});

function createSingleExpense(expenses) {
  return expenses
    .map((expense) => {
      const { _id, expenseName, expenseAmount } = expense;
      return `
       <div class="expense-item">
         <p>${expenseName}:GH¢ <span class="amount">${expenseAmount}</span></p>
        <div class="control-btns">
        <!-- edit link -->
        <a href="expense.html?id=${_id}"  class="edit-link">
        <i class="fas fa-edit"></i>
        </a>
        <!-- delete btn -->
        <button type="button" class="delete-btn" data-id="${_id}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
        </div>
        `;
    })
    .join("");
}

const showExpenses = async () => {
  loadingDOM.style.visibility = "visible";

  try {
    const {
      data: { expenses },
    } = await axios.get("/api/v1/expenses");
    const amounts = expenses.map((expense) => expense.expenseAmount);
    const total = amounts.reduce((acc, item) => {
      acc += item;
      return acc;
    }, 0);

    balance.innerText = total.toFixed(2);

    // filter incomes from allexpenses
    const incomeList = expenses.filter((expense) => {
      return expense.expenseAmount > 0;
    });

    const incomes = createSingleExpense(incomeList);
    if (incomes.length < 1) {
      incomesList.innerHTML = `<p class="text-center empty-list">list is empty</p>`;
    } else {
      incomesList.innerHTML = incomes;
    }

    // filter expenditures from allexpenses
    const expenditureList = expenses.filter((expense) => {
      return expense.expenseAmount < 0;
    });

    const expenditures = createSingleExpense(expenditureList);
    if (expenditures.length < 1) {
      expendituresList.innerHTML = `<p class="text-center empty-list">list is empty</p>`;
    } else {
      expendituresList.innerHTML = expenditures;
    }
  } catch (error) {
    incomesList.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};
showExpenses();
0;
// delete expense /api/expenses/:id
sidebar.addEventListener("click", async (e) => {
  const element = e.target;
  if (element.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/expenses/${id}`);
      showExpenses();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

function reset() {
  nameInput.value = "";
  amountInput.value = "";
  formAlertDOM.style.display = "block";
  formAlertDOM.textContent = `new expense added`;
  formAlertDOM.classList.add("text-success");
}

// create new expense
// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const expenseName = nameInput.value;
  const expenseAmount = amountInput.value;

  try {
    await axios.post("/api/v1/expenses", { expenseName, expenseAmount });
    showExpenses();
    reset();
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `an error occurred, please fill in the fields and try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
