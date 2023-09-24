'use strict';

class User {
    static #users = {                                    //private 설정
        id: ['11','12','13'],
        pwd: ['a','b','c'],
    };
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = User;