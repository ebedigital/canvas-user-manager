const { deleteCanvasUser } = require("./canvasDelete");
const { removeUser } = require("../data/cache");
const { getCanvasUserId } = require("./canvasLookup");

async function bulkDelete(users) {

    let deleted = 0;
    let failed = 0;

    console.clear();

    console.log("==========================================");
    console.log("         SMART BULK DELETE");
    console.log("==========================================\n");

    console.log(`Users to Delete : ${users.length}\n`);

    for (let i = 0; i < users.length; i++) {

        const user = users[i];

        // Delete User
      
       let canvasId = user.id;

        // Kung SIS ID (UID-...)
        if (String(user.id).startsWith("UID-")) {

            const lookup = await getCanvasUserId(user.id);

            if (!lookup.success) {
            failed++;
            continue;
}
           canvasId = lookup.id;
            

}

const result = await deleteCanvasUser(canvasId);

        if (result.success) {

            deleted++;
            removeUser(user.id);

        } else {

            failed++;

        }

        // Progress Bar
        const width = 30;

        const percent = Math.floor(
            ((i + 1) / users.length) * 100
        );

        const filled = Math.floor(
            (percent / 100) * width
        );

        const bar =
            "█".repeat(filled) +
            "░".repeat(width - filled);

        process.stdout.write(
            `\r${bar} ${percent}% (${i + 1}/${users.length})  Deleted:${deleted}  Failed:${failed}`
        );

    }

    console.log("\n");

    console.log("==========================================");
    console.log("         DELETE COMPLETE");
    console.log("==========================================");

    console.log(`Deleted : ${deleted}`);
    console.log(`Failed  : ${failed}\n`);

}

module.exports = {
    bulkDelete
};