const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const User = require('../models/User');

// Get assignments for student
router.get('/student/:clerkId', async (req, res) => {
  try {
    const { status, subject, page = 1, limit = 10 } = req.query;
    const student = await User.findOne({ clerkId: req.params.clerkId });
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    let query = { isActive: true };
    
    if (student.class) {
      query.class = student.class;
    }
    
    if (subject && subject !== 'all') {
      query.subject = subject;
    }
    
    const assignments = await Assignment.find(query)
      .populate('teacher', 'firstName lastName')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Add submission status for each assignment
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(
        sub => sub.student.toString() === student._id.toString()
      );
      
      let status = 'pending';
      if (submission) {
        status = submission.isGraded ? 'graded' : 'submitted';
      } else if (new Date() > assignment.dueDate) {
        status = 'overdue';
      }
      
      return {
        ...assignment.toObject(),
        submissionStatus: status,
        submission: submission || null
      };
    });
    
    // Filter by status if provided
    let filteredAssignments = assignmentsWithStatus;
    if (status && status !== 'all') {
      filteredAssignments = assignmentsWithStatus.filter(
        assignment => assignment.submissionStatus === status
      );
    }
    
    res.json({
      assignments: filteredAssignments,
      total: filteredAssignments.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get assignments for teacher
router.get('/teacher/:clerkId', async (req, res) => {
  try {
    const teacher = await User.findOne({ clerkId: req.params.clerkId, role: 'teacher' });
    
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    const assignments = await Assignment.find({ teacher: teacher._id, isActive: true })
      .populate('submissions.student', 'firstName lastName rollNumber')
      .sort({ createdAt: -1 });
    
    res.json({ assignments });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create assignment (teachers only)
router.post('/', async (req, res) => {
  try {
    const { clerkId } = req.body;
    const teacher = await User.findOne({ clerkId, role: 'teacher' });
    
    if (!teacher) {
      return res.status(403).json({ error: 'Only teachers can create assignments' });
    }
    
    const assignment = new Assignment({
      ...req.body,
      teacher: teacher._id
    });
    
    await assignment.save();
    await assignment.populate('teacher', 'firstName lastName');
    
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit assignment (students only)
router.post('/:id/submit', async (req, res) => {
  try {
    const { clerkId, fileUrl, fileName } = req.body;
    const student = await User.findOne({ clerkId, role: 'student' });
    
    if (!student) {
      return res.status(403).json({ error: 'Only students can submit assignments' });
    }
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === student._id.toString()
    );
    
    if (existingSubmission) {
      return res.status(400).json({ error: 'Assignment already submitted' });
    }
    
    // Add submission
    assignment.submissions.push({
      student: student._id,
      fileUrl,
      fileName
    });
    
    await assignment.save();
    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Grade assignment (teachers only)
router.put('/:assignmentId/grade/:submissionId', async (req, res) => {
  try {
    const { clerkId, grade, feedback } = req.body;
    const teacher = await User.findOne({ clerkId, role: 'teacher' });
    
    if (!teacher) {
      return res.status(403).json({ error: 'Only teachers can grade assignments' });
    }
    
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    // Check if teacher owns this assignment
    if (assignment.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const submission = assignment.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    
    submission.grade = grade;
    submission.feedback = feedback;
    submission.isGraded = true;
    
    await assignment.save();
    res.json({ message: 'Assignment graded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;