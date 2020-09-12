const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questions_controller');

router.post('/add', questionsController.add);

router.post('/search', questionsController.search);

module.exports = router;
