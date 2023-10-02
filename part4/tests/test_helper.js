const Blog = require("../models/blog")

const starterData = [
    {
      "title": "Generic Blog Title 1",
      "author": "Jerome K Jerome",
      "url": "http://www.google.com",
      "likes": 1
    },
    {
      "title": "Generic Blog Title 2",
      "author": "Alice Author",
      "url": "http://www.example.com",
      "likes": 10
    },
    {
      "title": "Tech Blog 1",
      "author": "Tech Guru",
      "url": "http://www.techblog.com",
      "likes": 15
    },
    {
      "title": "Food Blog",
      "author": "Food Lover",
      "url": "http://www.foodblog.com",
      "likes": 8
    },
    {
      "title": "Travel Diary",
      "author": "Wanderlust Explorer",
      "url": "http://www.travelblog.com",
      "likes": 20
    },
    {
      "title": "Sports News",
      "author": "Sports Fanatic",
      "url": "http://www.sportsblog.com",
      "likes": 12
    },
    {
      "title": "Fashion Trends",
      "author": "Fashionista",
      "url": "http://www.fashionblog.com",
      "likes": 18
    },
    {
      "title": "Music Vibes",
      "author": "Music Enthusiast",
      "url": "http://www.musicblog.com",
      "likes": 25
    },
    {
      "title": "Movie Reviews",
      "author": "Movie Buff",
      "url": "http://www.movieblog.com",
      "likes": 7
    },
    {
      "title": "Science Wonders",
      "author": "Science Geek",
      "url": "http://www.scienceblog.com",
      "likes": 14
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    starterData, blogsInDb
  }

