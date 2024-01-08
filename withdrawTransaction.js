const Transaction = require('./transaction')

class WithdrawTransaction extends Transaction {
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
        this._succeeded = this._account.withdraw(this._amount);
    }

    rollback() {
        super.rollback();
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