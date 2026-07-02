const axios = require("axios");
const config = require("./config");

let users = [];

async function connectCanvas() {

    console.log("\nConnecting to Canvas...\n");

    users = [];

    let page = 1;

    while (true) {

        console.log(`Loading page ${page}...`);

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

        page++;

    }

    console.log("\n==================================");
    console.log("Canvas Connected");
    console.log("==================================");
    console.log(`Users Loaded : ${users.length}\n`);

}

function getUsers() {

    return users;

}

module.exports = {

    connectCanvas,
    getUsers

};