const Blog = require("../models/Blogs");

const createBlog = async (req, res, next) => {
  //   console.log(req.body);
  const { title, createdBy } = req.body;
  const newBlog = await Blog.create({ title, createdBy });
  res.json(newBlog);
};

module.exports = { createBlog };
