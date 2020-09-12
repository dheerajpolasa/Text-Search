const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('../controllers/home_controller');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Router to handle the home page
router.get('/', homeController.home);

// Route to handle all the traffic of questions
router.use('/questions', require('./questions'));

module.exports = router;
