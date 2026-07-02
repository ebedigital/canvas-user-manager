const { getUsers } = require("./canvas");
const { showDashboard } = require("./dashboard");
const { connectCanvas } = require("./canvas");
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

async function showMenu() {

    console.log("1. Connect to Canvas");
    console.log("2. View Users");
    console.log("3. Search Users");
    console.log("4. Export CSV");
    console.log("5. Settings");
    console.log("6. Exit\n");

    const choice = await ask("Select: ");

    switch(choice){

    case "1":

       await connectCanvas();

       await showDashboard(getUsers().length);

        break;

    case "6":

        process.exit();

        break;

    default:

        console.log("\nComing Soon...\n");

}

}

module.exports = {

    showMenu

};