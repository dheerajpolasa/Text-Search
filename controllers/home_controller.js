const Question = require('../models/question');

module.exports.home = async function (req, res) {
  try {
    // console.log("Hello");
    const questions = await Question.find({});
    return res.render('home', {
      title: 'Text Search APP',
      questions: questions,
    });
  } catch (err) {}
};
