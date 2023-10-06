const User = require("../models/user")
const Blog = require("../models/blog")

const starterData = [
  {
    "title": "Generic Blog Title 1",
    "author": "Jerome K Jerome",
    "url": "http://www.google.com",
    "likes": 1,

    "id": "651d5dd4f96318ea48aa0ad0"
  },
  {
    "title": "Generic Blog Title 2 ",
    "author": "Austin ",
    "url": "http://www.google.com",
    "likes": 1223,

   "id": "651d5dfef96318ea48aa0ad6"
  }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    starterData, blogsInDb, usersInDb
  }

