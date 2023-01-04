const sidebar = document.querySelector(".sidebar");
const loadingText = document.querySelector(".loading-text");
const formDOM = document.querySelector(".expense-form");
const nameInput = document.querySelector(".name-input");
const amountInput = document.querySelector(".amount-input");
const formAlert = document.querySelector(".form-alert");

const balance = document.querySelector(".balance");
const incomeList = document.querySelector(".income-list");
const expenditureList = document.querySelector(".expenditure-list");

const btnMenu = document.querySelector(".btn-menu");
const btnCloseSidebar = document.querySelector(".btn-close-sidebar");

btnMenu.addEventListener("click", () => {
  sidebar.classList.add("show-sidebar");
});

btnCloseSidebar.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});

// function creates and returns a single expense component
function createExpense(expenses) {
  return expenses
    .map((expense) => {
      const { _id, expenseName, expenseAmount } = expense;
      return `
       <div class="expense-item">
         <p>${expenseName}:GH¢ <span class="amount">${expenseAmount.toFixed(
        2
      )}</span></p>
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

// function fetches expenses from the database and displays them
const showExpenses = async () => {
  loadingText.style.visibility = "visible";
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
    const filteredIncomes = expenses.filter((expense) => {
      return expense.expenseAmount > 0;
    });
    const incomes = createExpense(filteredIncomes);
    if (incomes.length < 1) {
      incomeList.innerHTML = `<p class="text-center empty-list">list is empty</p>`;
    } else {
      incomeList.innerHTML = incomes;
    }

    // filter expenditures from allexpenses
    const filteredExpenditures = expenses.filter((expense) => {
      return expense.expenseAmount < 0;
    });
    const expenditures = createExpense(filteredExpenditures);
    if (expenditures.length < 1) {
      expenditureList.innerHTML = `<p class="text-center empty-list">list is empty</p>`;
    } else {
      expenditureList.innerHTML = expenditures;
    }
  } catch (error) {
    incomeList.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingText.style.visibility = "hidden";
};
showExpenses();

// delete expense /api/expenses/:id
sidebar.addEventListener("click", async (e) => {
  const element = e.target;
  if (element.parentElement.classList.contains("delete-btn")) {
    loadingText.style.visibility = "visible";
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/expenses/${id}`);
      showExpenses();
    } catch (error) {
      console.log(error);
    }
  }
  loadingText.style.visibility = "hidden";
});

function reset() {
  nameInput.value = "";
  amountInput.value = "";
  formAlert.style.display = "block";
  formAlert.textContent = `new expense added`;
  formAlert.classList.add("text-success");
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
    formAlert.style.display = "block";
    formAlert.innerHTML = `an error occurred, please fill in the fields and try again`;
  }
  setTimeout(() => {
    formAlert.style.display = "none";
    formAlert.classList.remove("text-success");
  }, 3000);
});
