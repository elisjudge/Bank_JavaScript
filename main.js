const Account = require('./account');
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
        3. Show Account Balance,
        4. Quit`);

        rl.question('Choose an option [1-4]: ', (input) => {
            const option = parseInt(input);
            
            if (!isNaN(option) && option >= 1 && option <= 4) {
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
    let depositAmount = 0;
    let depositSuccess = false;
    do {
        try {
            depositAmount = parseFloat(await readDepositAmount());
            if (!isNaN(depositAmount)) {
                break;
            }
            else {
                console.log("Please ensure that you are entering a valid deposit.")
            }
        }
        catch {
            console.log("Error: Please ensure that you are entering a valid deposit.")
        }

    } while (depositSuccess == false);

    depositSuccess = account.deposit(depositAmount)

    if (depositSuccess) {
        console.log("Deposit was successful.")
    }
    else {
        console.log("Deposit was not successful. Please use non-negative values.")
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
    let withdrawAmount = 0;
    let withdrawSuccess = false;
    do {
        try {
            withdrawAmount = parseFloat(await readWithdrawAmount());
            if (!isNaN(withdrawAmount)) {
                break;
            }
            else {
                console.log("Please ensure that you are entering a valid withdrawal.")
            }
        }
        catch {
            console.log("Error: Please ensure that you are entering a valid withdrawal.")
        }

    } while (withdrawSuccess == false);

    withdrawSuccess = account.withdraw(withdrawAmount)

    if (withdrawSuccess) {
        console.log("Withdrawal was successful.")
    }
    else {
        console.log("Withdraw was not successful.")
        console.log("Please use non-negative values.")
        console.log("Withdrawal cannot exceed account balance.")
    }

}

function doPrint(account) {
    account.printAccount();
}

async function main() {
    const account = new Account('John', 100);
    let userSelection = 0;
    do {
        userSelection = await readUserOption();
        
        switch(userSelection){
            case MenuOption.Deposit:
                await doDeposit(account);
                break;
            case MenuOption.Withdraw:
                await doWithdraw(account);
                break;
            case MenuOption.Print:
                doPrint(account);
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
	Print: 3,
	Quit: 4
});

if (require.main === module) {
    main();
}