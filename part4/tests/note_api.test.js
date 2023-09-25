const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const api = supertest(app)

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

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(starterData[0])
    await blogObject.save()
    blogObject = new Blog(starterData[1])
    await blogObject.save()
  })

test("4.8 notes are returned as json", async () => {
  const response = await api.get("/api/blogs")
  await expect(response.status).toBe(200)
  await expect(response.type).toEqual("application/json")
})

test("4.9 unique id property", async () => {
    const response = await api.get("/api/blogs")
    await expect(response.body[0].id).toBeDefined()
})

test("4.10 post method", async () => {
    const newBlog = {
        "title": "Generic Blog Title 3",
        "author": "Bob Author",
        "url": "http://www.example.com",
        "likes": 1
        }
    const response1 = await api.get("/api/blogs")
    const initialLength = response1.body.length
    const response = await api.post("/api/blogs").send(newBlog)
    await expect(response.type).toEqual("application/json")
    await expect(response.status).toBe(201)
    const response2 = await api.get("/api/blogs")
    const finalLength = response2.body.length
    await expect(finalLength).toBe(initialLength + 1)
  })

test("4.11 default likes", async () => {
    const newBlog = {
        "title": "Generic Blog Title 3",
        "author": "Bob Author",
        "url": "http://www.example.com"
        }

    const response = await api.post("/api/blogs").send(newBlog)
    await expect(response.status).toBe(201)
    await expect(response.type).toEqual("application/json")
    await expect(response.body.likes).toBe(0)
})

test("4.12 missing data", async () => {
  const newBlog = {
      "author": "Bob Author",
      "like":21
      }
  const response = await api.post("/api/blogs").send(newBlog)
  await expect(response.status).toBe(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})