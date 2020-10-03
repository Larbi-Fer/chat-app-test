const router = require('express').Router()

const authGuard = require('./guards/auth.guard')
const homeController = require('../controllers/home.controller')

router.get('/', authGuard.isAuth, homeController.getHomt)

module.exports = router