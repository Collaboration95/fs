const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = request.user
  if(!user) {
    return response.status(404).json({ error: "User not found" }).end()
  }
  const userinfo = await Blog.findById({ _id: request.params.id })
  if (userinfo.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "Unauthorized" })
  }
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).json(result).end()
})

blogRouter.patch("/:id", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = request.user
  if (!user) {
    return response.status(404).json({ error: "User not found" }).end()
  }
  console.log(request.params.id)
  const bloginfo = await Blog.findById({ _id: request.params.id })
  console.log(bloginfo)
  if(!bloginfo || !user || !bloginfo.user || !user.id) {
    return response.status(404).json({ error: "Blog not found" }).end()
  }
  console.log(bloginfo.user.toString())
  console.log(user.id.toString())
  if (bloginfo.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "Unauthorized" })
  }

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true }
  )

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" })
  }
  console.log(updatedBlog)
  response.status(201).json(updatedBlog)
})

blogRouter.post("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  } else {
    const user = request.user
    if (!user) {
      return response.status(404).json({ error: "User not found" }).end()
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    if (!blog.likes) {
      blog.likes = 0
    }

    if (!blog.title || !blog.url || !blog.author) {
      return response.status(400).json({ error: "Bad Request" }).end()
    }

    const savedBlog = await blog.save()
    user.Blog = user.Blog.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  }
})

module.exports = blogRouter