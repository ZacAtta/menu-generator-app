const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json({ success: true, data: tags });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Get single tag
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    res.json({ success: true, data: tag });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Add an tag
router.post('/', async (req, res) => {
  const tag = new Tag({
    tagName: req.body.tagName,
    tagColor: req.body.tagColor,
   });

  try {
    const savedTag = await tag.save();
    res.json({ success: true, data: savedTag });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Update idea
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    // Match the usernames
    const updatedTag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          tagName: req.body.tagName,
          tagColor: req.body.tagColor,
        },
      },
      { new: true }
    );
    return res.json({ success: true, data: updatedTag });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    // Match the usernames
    await Tag.findByIdAndDelete(req.params.id);
    return res.json({ success: true, data: {} });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
