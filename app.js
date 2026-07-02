const { showMenu } = require("./menu");

async function start() {

    console.clear();

    console.log("====================================");
    console.log("     CANVAS USER MANAGER v1.0");
    console.log("====================================\n");

    await showMenu();

}

start();