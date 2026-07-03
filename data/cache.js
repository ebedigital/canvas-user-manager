let users = [];

function setUsers(data) {
    users = data;
}

function getUsers() {
    return users;
}

function clearUsers() {
    users = [];
}

function removeUser(userId) {

    users = users.filter(user => user.id !== userId);

}

module.exports = {
    setUsers,
    getUsers,
    clearUsers,
    removeUser
};