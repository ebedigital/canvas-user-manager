const { connectCanvas } = require("./canvas");

async function refreshUsers() {

    await connectCanvas();

}

module.exports = {
    refreshUsers
};