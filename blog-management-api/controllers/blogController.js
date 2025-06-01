import Blog from '../models/blog.js';

export const createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, createdBy: req.user.userId });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user.userId });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true }
    );
    if (!blog) return res.status(403).json({ error: "Unauthorized or not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const result = await Blog.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!result) return res.status(403).json({ error: "Unauthorized or not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      {
        $facet: {
          totalBlogs: [{ $count: "count" }],
          blogsPerUser: [
            { $group: { _id: "$createdBy", count: { $sum: 1 } } }
          ],
          topTags: [
            { $unwind: "$tags" },
            { $group: { _id: "$tags", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
          ]
        }
      }
    ]);
    res.json(stats[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
