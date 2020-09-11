const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questions_controller');

router.post('/add', questionsController.add);

module.exports = router;
