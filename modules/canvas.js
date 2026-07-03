const { setUsers, getUsers, clearUsers } = require("../data/cache");
const axios = require("axios");
const config = require("../config");
const cliProgress = require("cli-progress");


async function connectCanvas(){

    console.clear();

    console.log("==========================================");
    console.log("      CANVAS USER MANAGER v2.0");
    console.log("==========================================\n");

    console.log("Connecting to Canvas...");
    console.log("✓ Connected\n");

    console.log("Downloading Users...\n");

    clearUsers();

    let users = [];

    let page = 1;

const progressBar = new cliProgress.SingleBar({
    format: 'Downloading |{bar}| {value} users',
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true
});

progressBar.start(10000, 0);

while (true) {

    const response = await axios.get(
        `${config.BASE_URL}/api/v1/accounts/${config.ACCOUNT_ID}/users`,
        {
            headers: {
                Authorization: `Bearer ${config.TOKEN}`
            },
            params: {
                per_page: 100,
                page
            }
        }
    );

    if (response.data.length === 0)
        break;

    users.push(...response.data);

    progressBar.update(users.length);

    page++;

}

progressBar.stop();
console.log("==================================");
console.log("Canvas Connected");
console.log("==================================");

setUsers(users);
console.log(`Users Loaded : ${users.length}`);


}

module.exports = {
    connectCanvas,
    getUsers

};