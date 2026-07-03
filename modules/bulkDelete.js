const readline = require("readline");
const { usersWithoutEmail } = require("./filters");
const { previewUsers } = require("./preview");
const { bulkDelete: runBulkDelete } = require("./deleteEngine");
const { importCsv } = require("./importCsv");

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

async function bulkDelete() {

    while (true) {

        console.clear();

        console.log("==========================================");
        console.log("         SMART BULK DELETE");
        console.log("==========================================\n");

        console.log("1. Users Without Email");
        console.log("2. Search Keyword");
        console.log("3. Import Canvas IDs");
        console.log("4. Import CSV");
        console.log("5. Back\n");

        const choice = await ask("Choice: ");

        switch (choice) {

            case "1": {

                const users = usersWithoutEmail();

                if (users.length === 0) {

                    console.log("\nNo users found.");
                    await ask("\nPress ENTER...");
                    break;

                }

                const action = await previewUsers(users);

                if (action !== "DELETE")
                    break;

                console.clear();

                console.log("==========================================");
                console.log("      SMART BULK DELETE");
                console.log("==========================================\n");

                console.log(`Found : ${users.length.toLocaleString()} users\n`);

                console.log("1. Delete First 5 (TEST)");
                console.log("2. Delete First 50");
                console.log("3. Delete First 100");
                console.log("4. Delete ALL");
                console.log("5. Cancel\n");

                const option = await ask("Choice: ");

                let usersToDelete = [];

                switch (option) {

                    case "1":
                        usersToDelete = users.slice(0, 5);
                        break;

                    case "2":
                        usersToDelete = users.slice(0, 50);
                        break;

                    case "3":
                        usersToDelete = users.slice(0, 100);
                        break;

                    case "4":
                        usersToDelete = users;
                        break;

                    default:
                        break;

                }

                if (usersToDelete.length === 0)
                    break;

                console.clear();

                console.log("==========================================");
                console.log("      FINAL CONFIRMATION");
                console.log("==========================================\n");

                console.log(
                    `${usersToDelete.length.toLocaleString()} users will be deleted.\n`
                );

                const confirm = (
                    await ask("Type DELETE ALL to continue: ")
                ).toUpperCase();

                if (confirm !== "DELETE ALL") {

                    console.log("\nCancelled.");
                    await ask("Press ENTER...");
                    break;

                }

                await runBulkDelete(usersToDelete);

                await ask("\nPress ENTER...");

                break;

            }

            case "2":

                console.log("\nComing Soon...");
                await ask("\nPress ENTER...");
                break;

            case "3":

                console.log("\nComing Soon...");
                await ask("\nPress ENTER...");
                break;

           case "4": {

    const filePath = await ask("\nCSV File Path: ");

    let users;

    try {

        users = importCsv(filePath);

    } catch (err) {

        console.log("\nUnable to open CSV.");
        console.log(err.message);

        await ask("\nPress ENTER...");

        break;

    }

    console.clear();

    console.log("==========================================");
    console.log("            CSV PREVIEW");
    console.log("==========================================\n");

    console.log(`Found : ${users.length.toLocaleString()} users\n`);

    const limit = Math.min(20, users.length);

    for (let i = 0; i < limit; i++) {

        console.log(`${i + 1}. ${users[i].name || "-"}`);
        console.log(`   ${users[i].email || "-"}`);
        console.log(`   ID: ${users[i].id}\n`);

    }

    console.log("------------------------------------------\n");

    console.log("1. Delete First 5 (TEST)");
    console.log("2. Delete First 50");
    console.log("3. Delete First 100");
    console.log("4. Delete ALL");
    console.log("5. Back\n");

    const option = await ask("Choice: ");

    let usersToDelete = [];

    switch (option) {

        case "1":
            usersToDelete = users.slice(0, 5);
            break;

        case "2":
            usersToDelete = users.slice(0, 50);
            break;

        case "3":
            usersToDelete = users.slice(0, 100);
            break;

        case "4":
            usersToDelete = users;
            break;

        default:
            break;

    }

    if (usersToDelete.length === 0)
        break;

    console.clear();

    console.log("==========================================");
    console.log("      FINAL CONFIRMATION");
    console.log("==========================================\n");

    console.log(
        `${usersToDelete.length.toLocaleString()} users will be deleted.\n`
    );

    const confirm = (
        await ask("Type DELETE ALL to continue: ")
    ).toUpperCase();

    if (confirm !== "DELETE ALL") {

        console.log("\nCancelled.");

        await ask("Press ENTER...");

        break;

    }

    await runBulkDelete(usersToDelete);

    await ask("\nPress ENTER...");

    break;

}

                case "5":

                    return;

                default:

                    console.log("\nInvalid Choice.");
                    await ask("\nPress ENTER...");

        }

    }

}

module.exports = {
    bulkDelete
};