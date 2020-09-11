const Question = require('../models/question');

module.exports.add = async function (req, res) {
  try {
    console.log(req.body);
    let tags = [];
    tags.push(req.body.tags);
    const question = await Question.create({
      question: req.body.question,
      topic: req.body.topic,
      tags: tags,
    });

    console.log(question);

    return res.redirect('back');
  } catch (err) {}
};
