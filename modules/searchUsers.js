const { userDetails } = require("./userDetails");
const { getUsers } = require("../data/cache");
const readline = require("readline");

function ask(question) {

    return new Promise(resolve => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, answer => {

            rl.close();

            resolve(answer.trim());

        });

    });

}

async function searchUsers() {

    while (true) {

        console.clear();

        console.log("==========================================");
        console.log("            SEARCH USERS");
        console.log("==========================================\n");

        const keyword = await ask("Search (or B to Back): ");

        if (keyword.toUpperCase() === "B")
            return;

        const users = getUsers();

        const results = users.filter(user => {

            const name = (user.name || "").toLowerCase();
            const email = (user.login_id || "").toLowerCase();
            const id = String(user.id);

            return (
                name.includes(keyword.toLowerCase()) ||
                email.includes(keyword.toLowerCase()) ||
                id.includes(keyword)
            );

        });

        console.clear();

        console.log("==========================================");
        console.log("           SEARCH RESULTS");
        console.log("==========================================\n");

        console.log(`Found ${results.length} user(s)\n`);

        if (results.length === 0) {

            console.log("No users found.\n");

            await ask("Press ENTER...");
            continue;

        }

        const limit = Math.min(20, results.length);

        for (let i = 0; i < limit; i++) {

            console.log(`${i + 1}. ${results[i].name}`);

        }

        console.log("");

        const choice = await ask(
            "Select user number (ENTER = Search Again): "
        );

        if (choice === "")
            continue;

        const index = parseInt(choice);

        if (!isNaN(index)) {

            if (index >= 1 && index <= limit) {

        await userDetails(results[index - 1]);

    }

}

    }

}

module.exports = {
    searchUsers
};