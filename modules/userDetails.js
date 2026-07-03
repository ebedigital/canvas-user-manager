const readline = require("readline");
const { deleteUser } = require("./deleteUser");

function ask(question) {

    return new Promise(resolve => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, answer => {

            rl.close();

            resolve(answer.trim().toUpperCase());

        });

    });

}

async function userDetails(user) {

    while (true) {

        console.clear();

        console.log("==========================================");
        console.log("            USER DETAILS");
        console.log("==========================================\n");

        console.log(`Canvas ID : ${user.id}`);
        console.log(`Name      : ${user.name}`);
        console.log(`Email     : ${user.login_id || "-"}`);
        console.log("");

        console.log("------------------------------------------");
        console.log("1. Delete User");
        console.log("2. Back\n");

        const choice = await ask("Choice: ");

        switch (choice) {

            case "1":

            await deleteUser(user);

            break;

            case "2":

            case "B":

                return;

        }

    }

}

module.exports = {
    userDetails
};