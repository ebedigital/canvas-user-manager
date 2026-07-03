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
            resolve(answer.trim().toUpperCase());

        });

    });
}

async function viewUsers() {

    const users = getUsers();

    const pageSize = 20;
    let currentPage = 0;

    while (true) {

        console.clear();

        const totalPages = Math.ceil(users.length / pageSize);

        const start = currentPage * pageSize;
        const end = Math.min(start + pageSize, users.length);

        console.log("==============================================================================");
        console.log("                               VIEW USERS");
        console.log("==============================================================================\n");

        console.log(`Page ${currentPage + 1} of ${totalPages}\n`);

        console.log(
            "#".padEnd(6) +
            "NAME".padEnd(35) +
            "EMAIL"
        );

        console.log("------------------------------------------------------------------------------");

        for (let i = start; i < end; i++) {

            const user = users[i];

            const number = String(i + 1).padEnd(6);

            const name = (user.name || "")
                .substring(0, 32)
                .padEnd(35);

            const email = (user.login_id || "-")
                .substring(0, 40);

            console.log(number + name + email);

        }

        console.log("------------------------------------------------------------------------------");

        console.log(
            `Showing ${start + 1} - ${end} of ${users.length.toLocaleString()} users\n`
        );

        console.log("[N] Next Page");
        console.log("[P] Previous Page");
        console.log("[S] Search");
        console.log("[B] Back\n");

        const choice = await ask("Choice: ");

        switch (choice) {

            case "N":

                if (currentPage < totalPages - 1)
                    currentPage++;

                break;

            case "P":

                if (currentPage > 0)
                    currentPage--;

                break;

            case "S":

                console.log("\nSearch module coming next...");
                await ask("Press ENTER...");
                break;

            case "B":

                return;

        }

    }

}

module.exports = {
    viewUsers
};