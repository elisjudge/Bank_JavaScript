class Bank {
    constructor() {
        this._accounts = [];
        this._transactions = [];
    }

    addAccount(account) {
        this._accounts.push(account);
    }

    getAccount(name) {
        this._name = name.toLowerCase().trim();
        return this._accounts.find(account => account.name.toLowerCase().trim() === this._name) || null;
    }

    executeTransaction(transaction) {
        transaction.execute();
        this._transactions.push(transaction);
    }

    printTransactionHistory() {
        for (let transaction in this._transactions) {
            this._transactions[transaction].print();
        }
    }
}

module.exports = Bank;