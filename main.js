const Account = require('./account');
const Bank = require('./bank');
const DepositTransaction = require('./depositTransaction');
const WithdrawTransaction = require('./withdrawTransaction');
const TransferTransaction = require('./transferTransaction')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function readUserOption() {
    return new Promise((resolve) => {
        console.log(`Type one of the following options:
        1. Add Account,
        2. Deposit Funds,
        3. Withdraw Funds,
        4. Transfer Funds,
        5. Show Account Balance,
        6. Show List of Transactions,
        7. Quit`);

        rl.question('Choose an option [1-7]: ', (input) => {
            const option = parseInt(input);
            
            if (!isNaN(option) && option >= 1 && option <= 7) {
                resolve(option);
            } else {
                console.log('Please make sure that you select a valid option');
                // Re-prompt user for valid input
                resolve(readUserOption()); 
            }
        });
    });
}

function readAccountName() {
    return new Promise((resolve) => {
        rl.question("Please enter the account name: ", (input) => {
            resolve(input || '')
        });
    });
}

function readOpeningBalance() {
    return new Promise((resolve) => {
        rl.question("Please enter the opening balance: ", (input) => {
            resolve(input);
        });
    });
}

async function findAccount(fromBank) {
    let name;
    let result;
    do {
        name = await readAccountName();
    } while (name === null && name === undefined && name === '' );

    result = fromBank.getAccount(name);
    if (result == null) {
        console.log(`No account with ${name}.`)
    }
    return result;
}

async function doAddAccount(toBank) {
    let accountName;
    let openingBalance;
    do {
        accountName = await readAccountName();
    } while (accountName === null || accountName === undefined || accountName === '' );

    while (true) {
        try {
            openingBalance = parseFloat(await readOpeningBalance());
            if (openingBalance < 0) {
                throw `Account balance cannot be a negative number.`
            }
            toBank.addAccount(new Account(accountName, openingBalance))
            break;
        } catch (err) {
            console.log(err);
        }
    }
}

function readDepositAmount() {
    return new Promise((resolve) => {
        rl.question("Please enter the amount that you wish to deposit: ", (input) => {
            resolve(input);
        });
    });
}

async function doDeposit(bank) {
    let account;
    account = await findAccount(bank);
    if (account == null) {
        return;
    }
    
    let depositAmount;
    try {
        depositAmount = parseFloat(await readDepositAmount());
        const depositTransaction = new DepositTransaction(account, depositAmount);
        bank.executeTransaction(depositTransaction);
        if (!depositTransaction.succeeded) {
            throw `Deposit was not successful`;
        }
        depositTransaction.print();
    } catch (err) {
        console.log(err);
    }
}

function readWithdrawAmount() {
    return new Promise((resolve) => {
        rl.question("Please enter the amount you wish to withdraw: ", (input) => {
            resolve(input);
        });
    });
}

async function doWithdraw(bank) {
    let account;
    account = await findAccount(bank);
    if (account == null) {
        return;
    }
    
    let withdrawAmount;
    try {
        withdrawAmount = parseFloat(await readWithdrawAmount());
        const withdrawTransaction = new WithdrawTransaction(account, withdrawAmount);
        bank.executeTransaction(withdrawTransaction);
        if (!withdrawTransaction.succeeded){
            throw `Withdraw was not successful.`
        }
        withdrawTransaction.print();
    } catch (err) {
        console.log(err);
    }
}

function readTransferAmount(toAccount) {
    return new Promise((resolve) => {
        rl.question(`What amount will you be transferring to ${toAccount.name}?: `, (input) => {
            resolve(input);
        });
    });
}

async function doTransfer(bank) {
    let fromAccount;
    let toAccount;

    try {
        fromAccount = await findAccount(bank);
        if (fromAccount == null) {
            return;
        }

        toAccount = await findAccount(bank);
        if (toAccount == null) {
            return;
        }

        if (fromAccount === toAccount) {
            throw `You cannot transfer between the same account.`;
        }
        
        let transferAmount;
        try {
            transferAmount = parseFloat(await readTransferAmount(toAccount));
            const transferTransaction = new TransferTransaction(fromAccount, toAccount, transferAmount);
            bank.executeTransaction(transferTransaction);
            if (!transferTransaction.succeeded) {
                throw `Transfer was not successful.`
            }
            transferTransaction.print();
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
}

async function doPrint(bank) {
    let account;
    account = await findAccount(bank);
    if (account == null) {
        return;
    }
    account.printAccount();
}

async function main() {
    const bank = new Bank();
    let userSelection = 0;
    do {
        userSelection = await readUserOption();
        
        switch(userSelection){
            case MenuOption.AddAccount:
                await doAddAccount(bank);
                break;
            case MenuOption.Deposit:
                await doDeposit(bank);
                break;
            case MenuOption.Withdraw:
                await doWithdraw(bank);
                break;
            case MenuOption.Transfer:
                await doTransfer(bank);
                break;
            case MenuOption.Print:
                await doPrint(bank);
                break;
            case MenuOption.PrintTransactions:
                bank.printTransactionHistory();
                break;
            case MenuOption.Quit:
                console.log(`Quit`);
                break;
        }
    } while (userSelection !== MenuOption.Quit);

    rl.close();
}

const MenuOption = Object.freeze({
	AddAccount: 1,
    Deposit: 2,
	Withdraw: 3,
    Transfer: 4,
	Print: 5,
    PrintTransactions: 6,
	Quit: 7
});

if (require.main === module) {
    main();
}