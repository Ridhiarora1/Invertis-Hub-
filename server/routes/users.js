const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    
    let query = { isActive: true };
    
    if (role && role !== 'all') {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-clerkId')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get students for teacher
router.get('/students/:clerkId', async (req, res) => {
  try {
    const teacher = await User.findOne({ clerkId: req.params.clerkId, role: 'teacher' });
    
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    // Get students from classes taught by this teacher
    const students = await User.find({ 
      role: 'student',
      isActive: true,
      // Add logic to filter by teacher's subjects/classes if needed
    }).select('firstName lastName email rollNumber class department');
    
    res.json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalStudents = await User.countDocuments({ role: 'student', isActive: true });
    const totalTeachers = await User.countDocuments({ role: 'teacher', isActive: true });
    const totalAdmins = await User.countDocuments({ role: 'admin', isActive: true });
    
    res.json({
      totalUsers,
      totalStudents,
      totalTeachers,
      totalAdmins
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user role (admin only)
router.put('/:id/role', async (req, res) => {
  try {
    const { role, adminClerkId } = req.body;
    
    // Verify admin
    const admin = await User.findOne({ clerkId: adminClerkId, role: 'admin' });
    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-clerkId');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Deactivate user (admin only)
router.put('/:id/deactivate', async (req, res) => {
  try {
    const { adminClerkId } = req.body;
    
    // Verify admin
    const admin = await User.findOne({ clerkId: adminClerkId, role: 'admin' });
    if (!admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-clerkId');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;