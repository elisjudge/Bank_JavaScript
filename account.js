class Account {
    constructor(name, startingBalance) {
        this._name = name;
        this._balance = startingBalance;
    }

    get name() {
        return this._name;
    }

    get balance() {
        return this._balance;
    }

    deposit(amountToAdd) {
        console.log(`Depositing $${amountToAdd}`);
        this._balance += amountToAdd;
    }

    withdraw(amountToSubtract) {
        console.log(`Withdrawing $${amountToSubtract}`);
        this._balance -= amountToSubtract;
    }

    printAccount() {
        console.log(`Account Name: ${this.name}, Account Balance $${this.balance}`);
    }
}

module.exports = Account;