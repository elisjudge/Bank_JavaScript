class Bank {
    constructor() {
        this._accounts = [];
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
    }
}

module.exports = Bank;