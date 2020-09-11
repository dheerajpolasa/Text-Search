const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

// Router to handle the home page
router.get('/', homeController.home);

// Route to handle all the traffic of questions
router.use('/questions', require('./questions'));

module.exports = router;
