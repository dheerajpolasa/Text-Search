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

questionSchema.index({ question: 'text' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
