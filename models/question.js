const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
