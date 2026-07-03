const { getUsers } = require("../data/cache");

function usersWithoutEmail() {

    const users = getUsers();

    return users.filter(user => {

        return !user.login_id || user.login_id.trim() === "";

    });

}

module.exports = {
    usersWithoutEmail
};