const Question = require('../models/question');

// Add new questions to database
module.exports.add = async function (req, res) {
  try {
    const question = await Question.create({
      question: req.body.question,
      topic: req.body.topic,
      tags: JSON.parse(req.body.tags),
    });

    if (req.xhr) {
      return res.json(201, {
        message: 'Question added to Database',
        data: {
          question: question,
        },
      });
    }
    return res.redirect('back');
  } catch (err) {
    return res.json(500, {
      error: 'Internal server error',
    });
  }
};

// Search the questions in the database
module.exports.search = async function (req, res) {
  try {
    const tags = await Question.find({
      tags: { $regex: req.query.text, $options: 'i' },
    });
    const questions = await Question.find({
      question: { $regex: req.query.text, $options: 'i' },
    });

    const allQuestions = [...tags, ...questions].map((question) =>
      JSON.stringify(question)
    );
    const uniqueQuestions = allQuestions
      .filter((value, index) => allQuestions.indexOf(value) === index)
      .map((question) => JSON.parse(question));

    if (req.xhr) {
      return res.json(201, {
        data: {
          questions: uniqueQuestions,
        },
      });
    }
  } catch (err) {
    if (req.xhr) {
      return res.json(500, {
        error: 'Internal service error',
      });
    }
  }
};
