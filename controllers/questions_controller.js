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
