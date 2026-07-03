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

async function previewUsers(users) {

    let page = 0;
    const pageSize = 20;
    const totalPages = Math.ceil(users.length / pageSize);

    while (true) {

        console.clear();

        console.log("==========================================");
        console.log("         PREVIEW USERS");
        console.log("==========================================\n");

        console.log(`Page ${page + 1} of ${totalPages}\n`);

        const start = page * pageSize;
        const end = Math.min(start + pageSize, users.length);

        console.log("#".padEnd(6) + "NAME");
        console.log("------------------------------------------");

        for (let i = start; i < end; i++) {

            console.log(
                String(i + 1).padEnd(6) +
                users[i].name
            );

        }

        console.log("------------------------------------------");
        console.log(`Showing ${start + 1}-${end} of ${users.length}\n`);

        console.log("[N] Next");
        console.log("[P] Previous");
        console.log("[D] Delete All");
        console.log("[B] Back\n");

        const choice = await ask("Choice: ");

        switch (choice) {

            case "N":

                if (page < totalPages - 1)
                    page++;

                break;

            case "P":

                if (page > 0)
                    page--;

                break;

            case "D":

                return "DELETE";

            case "B":

                return "BACK";

        }

    }

}

module.exports = {
    previewUsers
};