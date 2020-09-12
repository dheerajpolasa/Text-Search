const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questions_controller');

// Route to hanlde the new question
router.post('/add', questionsController.add);

// Route to search the
router.get('/search', questionsController.search);

module.exports = router;
