const Blog = require("../models/User");
const User = require("../models/User");

const getAllBlogs = async (req, res) => {
  try {
    const temp = await Blog.find();
    const blogs = temp.reverse();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
  }
};
const getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};
const modifyBlog = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(req.body);

    let blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};
const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    let blog = await Blog.findById(id);
    blog = await Blog.findByIdAndDelete(id, req.body, { new: true });
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
  }
};
const createBlog = async (req, res) => {
  try {
    const post = await Blog.create({
      ...req.body,
      createdBy: {
        id: req.user._id,
        avatar: req.user.avatar,
        name: req.user.name,
      },
      createdAt: new Date(),
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getBlog, createBlog, modifyBlog, getAllBlogs, deleteBlog };
