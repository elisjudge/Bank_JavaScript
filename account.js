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
        if (amountToAdd > 0) {
            this._balance += amountToAdd;
            return true;
        }
        return false;
    }

    withdraw(amountToSubtract) {
        if ((amountToSubtract <= this._balance) && (amountToSubtract > 0)) {
            this._balance -= amountToSubtract;
            return true;
        }
        return false;
    }

    printAccount() {
        console.log(`Account Name: ${this.name}, Account Balance $${this.balance}`);
    }
}

module.exports = Account;
