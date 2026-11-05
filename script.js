const form = document.querySelector("form");
const descriptionInput = document.querySelector('input[type="text"]');
const amountInput = document.querySelector('input[type="number"]');
const expenseList = document.querySelector(".expense-list");
const clearButton = document.querySelector(".clear-btn");
const themeToggle = document.querySelector("#theme-toggle");
const totalExpense = document.querySelector(".total-expenses");
const body = document.querySelector("body");
const expenseCount = document.querySelector(".expense-count");
let total = 0;
function updateTotal() {
    total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);
    let word;
    if (expenses.length === 1) {
        word = "expense";
    }
    else {
        word = "expenses";
    }
    totalExpense.textContent = `₦${total}`;
    expenseCount.textContent = `${expenses.length} ${word}`;
}
const expenses = [];
const savedExpenses = localStorage.getItem("expense");
const savedExpensesArray = savedExpenses ? JSON.parse(savedExpenses) : [];
savedExpensesArray.forEach(function (expenseData) {
    expenses.push(expenseData);
    const expense = document.createElement("div");
    expense.classList.add("expense");
    expenseList.appendChild(expense);
    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = expenseData.description;
    expense.appendChild(descriptionElement);
    const amountContainer = document.createElement("div");
    const amountElement = document.createElement("strong");
    amountElement.textContent = `₦${expenseData.amount}`;
    amountContainer.appendChild(amountElement);
    expense.appendChild(amountContainer);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    amountContainer.appendChild(deleteButton);
    deleteButton.textContent = "×" ;
    deleteButton.addEventListener("click", function () {
        expense.remove();
        const index = expenses.findIndex(function (item) {
        return item.description === expenseData.description &&
               item.amount === expenseData.amount;
    });

    expenses.splice(index, 1);                               
    localStorage.setItem("expense", JSON.stringify(expenses))
     updateTotal();                                      
    });
    updateTotal();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const description = descriptionInput.value;
    const amount = Number(amountInput.value);
    const expense = document.createElement("div");
    expense.classList.add("expense");
    expenseList.appendChild(expense);
    const descriptionElement = document.createElement("span");
    descriptionElement.textContent = description;
    expense.appendChild(descriptionElement);
    const amountContainer = document.createElement("div");
    const amountElement = document.createElement("strong");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×" ;
    amountElement.textContent = `₦${amount}`;
    amountContainer.appendChild(amountElement);
    expense.appendChild(amountContainer);
    amountContainer.appendChild(deleteButton);
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
        expense.remove();
        const index = expenses.findIndex(function (item) {
            return item.description === expenseData.description &&
            item.amount === expenseData.amount;
        });
            expenses.splice(index, 1);
            localStorage.setItem("expense",JSON.stringify(expenses));
            updateTotal();
            
    });
    const expenseData = {
        description: description,
        amount: amount,
    };
    expenses.push(expenseData);
    localStorage.setItem("expense",JSON.stringify(expenses));
    updateTotal();
});
updateTotal();
clearButton.addEventListener("click", function () {
    expenseList.innerHTML ="";
    expenses.length = 0;
    localStorage.removeItem("expense");
    updateTotal();
});
themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark");
});