const readline = require("readline");

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

    console.clear();

    console.log("====================================");
    console.log("      CANVAS USER MANAGER");
    console.log("====================================\n");

    console.log("Canvas Status : Connected");
    console.log(`Users Loaded  : ${totalUsers}\n`);

    console.log("1. View Users");
    console.log("2. Search Users");
    console.log("3. Statistics");
    console.log("4. Export CSV");
    console.log("5. Refresh Users");
    console.log("6. Back");
    console.log("7. Exit\n");

    const choice = await ask("Select: ");

    console.log("\nSelected:", choice);

}

module.exports = {

    showDashboard

};