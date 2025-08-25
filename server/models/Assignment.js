const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileUrl: String,
  fileName: String,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  grade: Number,
  feedback: String,
  isGraded: {
    type: Boolean,
    default: false
  }
});

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: String,
  dueDate: {
    type: Date,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true
  },
  instructions: String,
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  submissions: [submissionSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assignment', assignmentSchema);