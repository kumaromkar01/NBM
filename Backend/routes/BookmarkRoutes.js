import express from 'express';
import Bookmark from '../models/bookmark.model.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();


router.delete("/deleteBookmark/:id", authMiddleware, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.status(200).json({
      message: "Bookmark deleted",
      id: bookmark._id
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { url, title, description } = req.body

    if (!url || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const bookmark = await Bookmark.create({
      url,
      title,
      description,
      user: req.user._id,
    })

    res.status(201).json({
      message: 'Bookmark added successfully',
      bookmark,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
      .sort({ createdAt: -1 })

    res.status(200).json(bookmarks)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
export default router;