const express = require("express");
const { check } = require('express-validator')
const { siginUser, signUpUser, updateUser, deleteUser } = require('../controller/user.controller')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const isAdmin = require("../middleware/isAdmin");

let userRouter = express.Router();

userRouter.post("/signin",[
    check('email').not(),check('password').not()
],siginUser);

userRouter.post("/signup", [
    check('email').not(),
    check('password').not().isStrongPassword()
],signUpUser)

userRouter.patch("/:id",[auth, isAdmin],updateUser)

userRouter.delete("/:id",[auth, isAdmin], deleteUser)


module.exports = userRouter;