import express from 'express';
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getStats
} from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.post('/', createBlog);
router.get('/', getBlogs);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/stats', getStats);

export default router;
