const currentBalance = document.getElementById('currentBalance');
const moneyInc = document.getElementById('moneyInc');
const moneyExp = document.getElementById('moneyExp');
const moneyMovements = document.getElementById('moneyMovements');
const addTransaction = document.getElementById('addTransaction');
const transactionConcept = document.getElementById('transactionConcept');
const transactionAmount = document.getElementById('transactionAmount');
const objTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null ? objTransactions : [];

function drawNewTransaction(transaction) {

    const symbol = transaction.transactionAmount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.transactionAmount < 0 ? 'exp' : 'inc');

    item.innerHTML = `
        ${transaction.transactionConcept} <span>${symbol}${Math.abs(transaction.transactionAmount)}</span>
        <button class="delete-button" onclick="removeTransaction(${transaction.id})">❌</button>
    `;
    
    moneyMovements.appendChild(item);
}

function newTransaction(t) {

    const transaction = {
        id: Math.floor(Math.random() * 100000),
        transactionConcept: transactionConcept.value,
        transactionAmount: +transactionAmount.value
    };

    transactions.push(transaction);

    drawNewTransaction(transaction);
    updateValues()
    updateLocalStorage()

    transactionConcept.value = ''
    transactionAmount.value = ''
}

function updateValues() {
    const amounts = transactions.map(transaction => transaction.transactionAmount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    currentBalance.innerText = `${total}€`;
    moneyInc.innerText = `${income}€`;
    moneyExp.innerText = `-${expense}€`;
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
    moneyMovements.innerHTML = '';
    transactions.forEach(drawNewTransaction);
    updateValues()
}

init();
addTransaction.addEventListener('submit', newTransaction);