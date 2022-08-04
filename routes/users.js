const express = require("express")
const router = express.Router()
const User = require("../models/user.model") 
const user_controller = require('../controllers/user.controller')

router.get("/all_users", user_controller.getAllUsers)

router.post('/new_user', user_controller.postNewUser)

router.get("/get_user/:id", user_controller.getUserByID)

router.patch("/edit_user/:id", user_controller.editUserByID)

router.delete("/delete_user/:id", user_controller.deleteUserByID)

module.exports = router