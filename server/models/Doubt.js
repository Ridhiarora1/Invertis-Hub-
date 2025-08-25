const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isTeacherResponse: {
    type: Boolean,
    default: false
  },
  attachments: [{
    fileName: String,
    fileUrl: String
  }]
}, {
  timestamps: true
});

const doubtSchema = new mongoose.Schema({
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
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: String,
  status: {
    type: String,
    enum: ['open', 'answered', 'resolved'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],
  attachments: [{
    fileName: String,
    fileUrl: String
  }],
  responses: [responseSchema],
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Doubt', doubtSchema);