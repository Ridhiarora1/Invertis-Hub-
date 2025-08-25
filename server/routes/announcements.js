const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');
const User = require('../models/User');

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const { type, search, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const announcements = await Announcement.find(query)
      .populate('author', 'firstName lastName role')
      .sort({ isPinned: -1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Announcement.countDocuments(query);
    
    res.json({
      announcements,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get announcements for specific user
router.get('/user/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    let query = { 
      isActive: true,
      $or: [
        { targetAudience: 'all' },
        { targetAudience: user.role + 's' }
      ]
    };
    
    // Add class-specific announcements for students
    if (user.role === 'student' && user.class) {
      query.$or.push({
        targetAudience: 'specific_class',
        targetClass: user.class
      });
    }
    
    const announcements = await Announcement.find(query)
      .populate('author', 'firstName lastName role')
      .sort({ isPinned: -1, createdAt: -1 });
    
    // Mark read status for each announcement
    const announcementsWithReadStatus = announcements.map(announcement => {
      const isRead = announcement.readBy.some(
        read => read.user.toString() === user._id.toString()
      );
      
      return {
        ...announcement.toObject(),
        isRead
      };
    });
    
    res.json({ announcements: announcementsWithReadStatus });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create announcement (teachers and admins only)
router.post('/', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return res.status(403).json({ error: 'Only teachers and admins can create announcements' });
    }
    
    const announcement = new Announcement({
      ...req.body,
      author: user._id
    });
    
    await announcement.save();
    await announcement.populate('author', 'firstName lastName role');
    
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark announcement as read
router.put('/:id/read', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    // Check if already marked as read
    const alreadyRead = announcement.readBy.some(
      read => read.user.toString() === user._id.toString()
    );
    
    if (!alreadyRead) {
      announcement.readBy.push({ user: user._id });
      await announcement.save();
    }
    
    res.json({ message: 'Announcement marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark all announcements as read
router.put('/read-all', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get all unread announcements for this user
    const announcements = await Announcement.find({
      isActive: true,
      'readBy.user': { $ne: user._id }
    });
    
    // Mark all as read
    for (const announcement of announcements) {
      announcement.readBy.push({ user: user._id });
      await announcement.save();
    }
    
    res.json({ message: 'All announcements marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update announcement
router.put('/:id', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    // Check if user is the author
    if (announcement.author.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author', 'firstName lastName role');
    
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete announcement
router.delete('/:id', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const user = await User.findOne({ clerkId });
    
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    
    // Check if user is the author
    if (announcement.author.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;