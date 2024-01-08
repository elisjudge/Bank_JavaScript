const Transaction = require('./transaction');

class DepositTransaction extends Transaction {
    constructor(account, amount) {
        super(amount);
        this._account = account;
        this._succeeded = false;
        
    }

    get succeeded() {
        return this._succeeded;
    }

    execute() {
        super.execute();
        this._succeeded = this._account.deposit(this._amount);
    }

    rollback() {
        super.rollback();
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