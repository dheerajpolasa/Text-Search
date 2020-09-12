const Question = require('../models/question');

// Get all the exisitng question in the database
module.exports.home = async function (req, res) {
  try {
    const questions = await Question.find({});
    return res.render('home', {
      title: 'Text Search APP',
      questions: questions,
    });
  } catch (err) {
    return res.redirect('back');
  }
};
