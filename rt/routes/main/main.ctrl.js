"use strict";

const User = require('../../Users/User');
const view = {
    main: (req, res) => {
        res.render('main/index');
    },
    login: (req, res) => {
        res.render('main/login');
    },
};

const process = {
    login: (req, res) => {
        const id = req.body.id, pwd = req.body.pwd;
        
        const users = User.getUsers("id","pwd");

        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.pwd[idx] === pwd) {
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: '로그인 실패!',
        });
    },
}

module.exports = {
    view,
    process,
};
