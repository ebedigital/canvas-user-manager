const readline = require("readline");
const { deleteCanvasUser } = require("./canvasDelete");
const { removeUser } = require("../data/cache");

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

async function deleteUser(user) {

    console.clear();

    console.log("==========================================");
    console.log("             DELETE USER");
    console.log("==========================================\n");

    console.log(`Canvas ID : ${user.id}`);
    console.log(`Name      : ${user.name}`);
    console.log(`Email     : ${user.login_id || "-"}\n`);

    console.log("------------------------------------------");
    console.log("WARNING!");
    console.log("This action cannot be undone.\n");

    const confirm = await ask(
        "Type DELETE to confirm (ENTER = Cancel): "
    );

    if (confirm !== "DELETE") {

        console.log("\nOperation Cancelled.");
        await ask("Press ENTER to continue...");
        return false;

    }

    console.clear();

    console.log("==========================================");
    console.log("         DELETE CONFIRMATION");
    console.log("==========================================\n");

    console.log("Delete request is READY.\n");

    console.log(`Canvas ID : ${user.id}`);
    console.log(`Name      : ${user.name}`);
    console.log(`Email     : ${user.login_id || "-"}\n`);

    console.log("Deleting user...\n");

const result = await deleteCanvasUser(user.id);

if(result.success){

    removeUser(user.id);

    console.log("✅ User deleted successfully.");

    console.log("✅ Cache updated.");


} else {

    console.log("❌ Delete failed.");

    console.log(result.error);

}

await ask("\nPress ENTER to continue...");

return result.success;
}

module.exports = {
    deleteUser
};