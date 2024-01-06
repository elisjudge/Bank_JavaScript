class WithdrawTransaction {
    constructor(account, amount) {
        this._account = account;
        this._amount = amount;
        this. _executed = false;
        this._succeeded = false;
        this._reversed = false;
    }

    get succeeded() {
        return this._succeeded;
    }

    get executed() {
        return this._executed;
    }

    get reversed() {
        return this._reversed;
    }

    execute() {
        if (this._executed) {
            throw `Cannot execute this transaction as it has already been executed.`;
        }
        this._executed = true;
        this._succeeded = this._account.withdraw(this._amount);
    }

    rollback() {
        if (!this._executed) {
            throw `Cannot reverse a transaction that has not already been executed.`;
        }
        if (this._reversed) {
            throw `Cannot reverse a transaction that has already been reversed.`;
        }
        if (this._account.deposit(this._amount)) {
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
        if (this._succeeded) {
            console.log(`You have withdrawn $${this._amount} from ${this._account.name}'s account.`)
        }
        else {
            console.log(`Your withdrawral was unsuccessful.`);
            if (this._reversed) {
                console.log(`Withdraw was reversed.`)
            }
        }
    }
}

module.exports = WithdrawTransaction;