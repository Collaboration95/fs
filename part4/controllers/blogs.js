const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}


blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
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


blogRouter.post("/", async (request, response) => {
  // const blog = new Blog(request.body)
  const body = request.body


  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  if (!user) {
    return response.status(404).json({ error: "User not found" }).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user:user.id
  })
  if(!blog.likes) {
    blog.likes = 0
  }
  if(!blog.title || !blog.url || !blog.author) {
    return response.status(400).json({ error: "Bad Request" }).end()

  }
  const savedBlog = await blog.save()
  user.Blog = user.Blog.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})
  // const user = await User.findById(request.body.userId)
  // blog.user = user._id
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  // const savedBlog = await blog.save()
  // user.blogs = user.blogs.concat(savedBlog._id)
  // await user.save()

module.exports = blogRouter
