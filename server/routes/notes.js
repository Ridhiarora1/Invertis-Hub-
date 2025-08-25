const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const { subject, search, page = 1, limit = 10 } = req.query;
    
    let query = { isPublic: true };
    
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
    
    const notes = await Note.find(query)
      .populate('teacher', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Note.countDocuments(query);
    
    res.json({
      notes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('teacher', 'firstName lastName');
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Increment download count
    note.downloadCount += 1;
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new note (teachers only)
router.post('/', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const teacher = await User.findOne({ clerkId, role: 'teacher' });
    
    if (!teacher) {
      return res.status(403).json({ error: 'Only teachers can create notes' });
    }
    
    const note = new Note({
      ...req.body,
      teacher: teacher._id
    });
    
    await note.save();
    await note.populate('teacher', 'firstName lastName');
    
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if user is the teacher who created the note
    if (note.teacher.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('teacher', 'firstName lastName');
    
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if user is the teacher who created the note
    if (note.teacher.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;