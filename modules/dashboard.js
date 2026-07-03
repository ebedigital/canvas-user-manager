const readline = require("readline");
const { viewUsers } = require("./viewUsers");
const { searchUsers } = require("./searchUsers");
const { bulkDelete } = require("./bulkDelete");
const { refreshUsers } = require("./refreshUsers");

function ask(question) {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {

        rl.question(question, answer => {

            rl.close();

            resolve(answer);

        });

    });

}

async function showDashboard(totalUsers) {

    while (true) {

        console.clear();

        console.log("====================================");
        console.log("      CANVAS USER MANAGER");
        console.log("====================================\n");

        console.log("Canvas Status : Connected");
        console.log(`Users Loaded  : ${totalUsers}\n`);

        console.log("1. View Users");
        console.log("2. Search Users");
        console.log("3. Smart Bulk Delete");
        console.log("4. Statistics");
        console.log("5. Export CSV");
        console.log("6. Refresh Users");
        console.log("7. Exit\n");

        const choice = await ask("Select: ");

        switch (choice) {

            case "1":

                await viewUsers();


                break;

            case "2":

                await searchUsers();

                break;

            case "3":

            await bulkDelete();

            break;    

            case "6":

                await refreshUsers();

                await ask("\nPress ENTER to continue...");

                break;
                
            case "7":

                process.exit();

            default:

                console.log("\nComing Soon...");
                await ask("\nPress ENTER to continue...");

        }

    }

}

module.exports = {
    showDashboard
};