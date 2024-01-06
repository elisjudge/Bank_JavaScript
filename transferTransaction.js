const DepositTransaction = require('./depositTransaction');
const WithdrawTransaction = require('./withdrawTransaction');

class TransferTransaction {
    constructor(fromAccount, toAccount, amount) {
        this._fromAccount = fromAccount;
        this._toAccount = toAccount;
        this._amount = amount;
        this._theWithdraw = new WithdrawTransaction(this._fromAccount, this._amount);
        this._theDeposit = new DepositTransaction(this._toAccount, this._amount);
        this._executed = false;
        this._reversed = false;
    }

    get executed() {
        return this._executed;
    }

    get reversed() {
        return this._reversed;
    }

    get succeeded() {
        if (this._theWithdraw.succeeded && this._theDeposit.succeeded) {
            return true;
        }
        else {
            return false;
        }
    }

    execute() {
        if (this._executed) {
            throw `Transaction cannot be executed. It has aleady been executed.`;
        }
        this._theWithdraw.execute();
        if (this._theWithdraw.succeeded) {
            this._theDeposit.execute();
            if (this._theDeposit.succeeded) {
                this._executed = true;
            }
            else {
                this._theWithdraw.rollback();
            }
        }
        else {
            throw `Cannot execute the deposit as the withdrawal was not successful.`
        }
    }

    rollback() {
        if (!this._executed) {
            throw `Cannot rollback this transaction. It has not been executed.`;
        }
        if (this._reversed) {
            throw `Cannot rollback this transaction. It has already been reversed.`;
        }
        if (this._theWithdraw.succeeded) {
            this._theWithdraw.rollback();
        }
        if (this._theDeposit.succeeded) {
            this._theDeposit.rollback();
        }
        if (this._theWithdraw.reversed && this._theDeposit.reversed) {
            this._reversed = true;
        }
    }

    print() {
        if (this._theWithdraw.succeeded && this._theDeposit.succeeded) {
            console.log(`Transfer of $${this._amount} from ${this._fromAccount.name}'s account to ${this._toAccount.name}'s account was successful.`);
            this._theWithdraw.print();
            this._theDeposit.print();
        }
        else {
            console.log(`Transfer was not successful.`);
            if (this._reversed) {
                console.log(`Transfer was reversed.`)
            }
        }
    }
}

module.exports = TransferTransaction