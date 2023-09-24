'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require("./main.ctrl");

router.get("/", ctrl.view.main);

router.get('/login', ctrl.view.login);

router.post('/login', ctrl.process.login);

module.exports = router;   // 연결 위해 내보내기


