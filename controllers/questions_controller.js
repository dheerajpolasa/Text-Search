const Question = require('../models/question');

module.exports.add = async function (req, res) {
  try {
    console.log(req.body);
    // return res.redirect('back');
    const question = await Question.create({
      question: req.body.question,
      topic: req.body.topic,
      tags: JSON.parse(req.body.tags),
    });

    console.log(question);

    if (req.xhr) {
      return res.json(201, {
        message: 'Question added to Database',
        data: {
          question: question,
        },
      });
    }
    return res.redirect('back');
  } catch (err) {}
};

module.exports.search = async function (req, res) {
  try {
    console.log(req.body);
    const tags = await Question.find({
      tags: { $regex: req.body.search, $options: 'i' },
    });
    const questions = await Question.find({
      question: { $regex: req.body.search, $options: 'i' },
    });
    console.log(tags, questions);

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
  } catch (err) {}
};
