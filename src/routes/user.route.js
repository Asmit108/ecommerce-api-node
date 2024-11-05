const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')

router.get(`/profile`, authenticate, authorize(['ADMIN', 'CUSTOMER']), userController.getUserProfile);
router.get(`/`, authenticate, authorize(['ADMIN']), userController.getAllUsers)

module.exports = router