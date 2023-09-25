const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.delete("/:id", (request, response) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

blogRouter.patch("/:id", (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(201).json(updatedBlog.toJSON())
    })
})


blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.likes) {
    blog.likes = 0
  }
  if(!blog.title || !blog.url || !blog.author) {
    return response.status(400).json({ error: "Bad Request" }).end()

  }
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter
