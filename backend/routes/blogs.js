const { createBlog } = require("../controllers/blogs");
const blogsRouter = require("express").Router();


blogsRouter.route("/create").post(createBlog)

module.exports= {blogsRouter}