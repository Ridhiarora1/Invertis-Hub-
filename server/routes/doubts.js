const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubt');
const User = require('../models/User');

// Get all doubts
router.get('/', async (req, res) => {
  try {
    const { status, subject, search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (subject && subject !== 'all') {
      query.subject = subject;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }
    
    const doubts = await Doubt.find(query)
      .populate('student', 'firstName lastName')
      .populate('responses.author', 'firstName lastName role')
      .populate('resolvedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Doubt.countDocuments(query);
    
    res.json({
      doubts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get doubts by student
router.get('/student/:clerkId', async (req, res) => {
  try {
    const student = await User.findOne({ clerkId: req.params.clerkId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    const doubts = await Doubt.find({ student: student._id })
      .populate('responses.author', 'firstName lastName role')
      .populate('resolvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    
    res.json({ doubts });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get doubt by ID
router.get('/:id', async (req, res) => {
  try {
    const doubt = await Doubt.findById(req.params.id)
      .populate('student', 'firstName lastName')
      .populate('responses.author', 'firstName lastName role')
      .populate('resolvedBy', 'firstName lastName');
    
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    
    res.json(doubt);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new doubt (students only)
router.post('/', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const student = await User.findOne({ clerkId, role: 'student' });
    
    if (!student) {
      return res.status(403).json({ error: 'Only students can post doubts' });
    }
    
    const doubt = new Doubt({
      ...req.body,
      student: student._id
    });
    
    await doubt.save();
    await doubt.populate('student', 'firstName lastName');
    
    res.status(201).json(doubt);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add response to doubt
router.post('/:id/respond', async (req, res) => {
  try {
    const { clerkId, content, attachments } = req.body;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    
    const response = {
      author: user._id,
      content,
      isTeacherResponse: user.role === 'teacher',
      attachments: attachments || []
    };
    
    doubt.responses.push(response);
    
    // Update status if teacher responds
    if (user.role === 'teacher' && doubt.status === 'open') {
      doubt.status = 'answered';
    }
    
    await doubt.save();
    await doubt.populate('responses.author', 'firstName lastName role');
    
    res.json(doubt);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark doubt as resolved
router.put('/:id/resolve', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    const doubt = await Doubt.findById(req.params.id);
    if (!doubt) {
      return res.status(404).json({ error: 'Doubt not found' });
    }
    
    // Only the student who posted the doubt or a teacher can resolve it
    if (doubt.student.toString() !== user._id.toString() && user.role !== 'teacher') {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    doubt.status = 'resolved';
    doubt.resolvedBy = user._id;
    doubt.resolvedAt = new Date();
    
    await doubt.save();
    res.json({ message: 'Doubt marked as resolved' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;