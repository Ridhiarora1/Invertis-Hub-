const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or update user from Clerk webhook
router.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'user.created' || type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, image_url } = data;
      
      const userData = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        firstName: first_name,
        lastName: last_name,
        profileImage: image_url
      };
      
      await User.findOneAndUpdate(
        { clerkId: id },
        userData,
        { upsert: true, new: true }
      );
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
router.get('/profile/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile/:clerkId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { clerkId: req.params.clerkId },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;