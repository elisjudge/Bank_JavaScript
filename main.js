const Account = require('./account');
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
        1. Deposit Funds,
        2. Withdraw Funds,
        3. Transfer Funds,
        4. Show Account Balance,
        5. Quit`);

        rl.question('Choose an option [1-5]: ', (input) => {
            const option = parseInt(input);
            
            if (!isNaN(option) && option >= 1 && option <= 5) {
                resolve(option);
            } else {
                console.log('Please make sure that you select a valid option');
                // Re-prompt user for valid input
                resolve(readUserOption()); 
            }
        });
    });
}

function readDepositAmount() {
    return new Promise((resolve) => {
        rl.question("Please enter the amount that you wish to deposit: ", (input) => {
            resolve(input);
        });
    });
}

async function doDeposit(account) {
    let depositAmount;
    try {
        depositAmount = parseFloat(await readDepositAmount());
        const transaction = new DepositTransaction(account, depositAmount);
        transaction.execute();
        transaction.print();
    }
    catch (err) {
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

async function doWithdraw(account) {
    let withdrawAmount;
    try {
        withdrawAmount = parseFloat(await readWithdrawAmount());
        const transaction = new WithdrawTransaction(account, withdrawAmount);
        transaction.execute();
        transaction.print();
    }
    catch (err) {
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

async function doTransfer(fromAccount, toAccount) {
    let transferAmount;
    try {
        transferAmount = parseFloat(await readTransferAmount(toAccount));
        const transaction = new TransferTransaction(fromAccount, toAccount, transferAmount);
        transaction.execute();
        transaction.print();
    }
    catch (err) {
        console.log(err);
    }
}

function doPrint(account) {
    account.printAccount();
}

async function main() {
    const account_001 = new Account('John', 100);
    const account_002 = new Account('Mike', 100);
    let userSelection = 0;
    do {
        userSelection = await readUserOption();
        
        switch(userSelection){
            case MenuOption.Deposit:
                await doDeposit(account_001);
                break;
            case MenuOption.Withdraw:
                await doWithdraw(account_001);
                break;
            case MenuOption.Transfer:
                await doTransfer(account_001, account_002);
                break;
            case MenuOption.Print:
                doPrint(account_001);
                doPrint(account_002);
                break;
            case MenuOption.Quit:
                console.log(`Quit`);
                break;
        }
    } while (userSelection !== MenuOption.Quit);

    rl.close();
}

const MenuOption = Object.freeze({
	Deposit: 1,
	Withdraw: 2,
    Transfer: 3,
	Print: 4,
	Quit: 5
});

if (require.main === module) {
    main();
}