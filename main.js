const Account = require('./account');

function main() {
    const account = new Account('John', 100);
    account.printAccount();
    account.deposit(100);
    account.printAccount();
    account.withdraw(50);
    account.printAccount();
    account.deposit(100);
    account.printAccount();
    account.withdraw(50);
    account.printAccount();
}

main();