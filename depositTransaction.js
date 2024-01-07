class DepositTransaction {
    constructor(account, amount) {
        this._account = account;
        this._amount = amount;
        this._executed = false;
        this._succeeded = false;
        this._reversed = false;
    }

    get executed() {
        return this._executed;
    }

    get succeeded() {
        return this._succeeded;
    }

    get reversed() {
        return this._reversed;
    }

    execute() {
        if (this._executed) {
            throw `Cannot execute this transaction as it has already been executed.`;
        }
        this._executed = true;
        this._succeeded = this._account.deposit(this._amount);
    }

    rollback() {
        if (!this._executed) {
            throw `Cannot reverse a transaction that has not already been executed.`
        }
        if (this._reversed) {
            throw `Cannot reverse a transaction that has already been reversed.`
        }
        if (this._account.withdraw(this._amount)) {
            this._reversed = true;
            this._executed = false;
            this._succeeded = false;
        }
        else {
            this._reversed = false;
            this._executed = true;
            this._succeeded = true;
        }
    }

    print() {
        if (this._succeeded){
            console.log(`You have deposited $${this._amount} into ${this._account.name}'s Account`)
        }
        else {
            console.log(`Your deposit was unsuccessful.`)
            if (this._reversed)
            console.log(`Deposit was reversed.`);
        }
    }
}

module.exports = DepositTransaction;