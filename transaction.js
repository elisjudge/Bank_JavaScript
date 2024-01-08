class Transaction {
    constructor(amount) {
        this._amount = amount;
        this._executed = false;
        this._reversed = false;
        this._dateStamp;
    }

    get executed() {
        return this._executed;
    }

    get succeeded() {
        return;
    }

    get reversed() {
        return this._reversed;
    }

    get dateStamp() {
        return this._dateStamp;
    }

    print() {
        return;
    }

    execute() {
        if (this._executed) {
            throw `Cannot execute this transaction as it has already been executed.`;
        }
        this._executed = true;
        this._dateStamp = new Date();
    }

    rollback() {
        if (!this._executed) {
            throw `Cannot reverse a transaction that has not already been executed.`
        }
        if (this._reversed) {
            throw `Cannot reverse a transaction that has already been reversed.`
        }
    }
}

module.exports = Transaction