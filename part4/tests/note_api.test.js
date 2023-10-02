const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.starterData[0])
  await blogObject.save()
  blogObject = new Blog(helper.starterData[1])
  await blogObject.save()
})

describe("4.8 Test Suite", () => {
  test("4.8 notes are returned as json", async () => {
    const response = await api.get("/api/blogs")
    await expect(response.status).toBe(200)
    await expect(response.type).toEqual("application/json")
  })
}
)

describe("4.9 Test Suite", () => {
  test("4.9 unique id property", async () => {
    const response = await api.get("/api/blogs")
    await expect(response.body[0].id).toBeDefined()
})

})


describe("4.10 Test Suite", () => {

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
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(3)
    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain("Generic Blog Title 3")
    const response2 = await api.get("/api/blogs")
    const finalLength = response2.body.length
    await expect(finalLength).toBe(initialLength + 1)
  })

}
)
describe("4.11 Test Suite", () => {

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
}
)
describe("4.12 Test Suite", () => {

  test("4.12 missing data", async () => {
    const newBlog = {
        "author": "Bob Author",
        "like":21
        }
    const response = await api.post("/api/blogs").send(newBlog)
    await expect(response.status).toBe(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(2)
  })
}
)

describe("4.13 Test Suite", () => {
  test("4.13 delete method", async () => {
    const response1 = await api.get("/api/blogs")
    const initialLength = response1.body.length
    const id = response1.body[0].id
    const response = await api.delete(`/api/blogs/${id}`)
    await expect(response.status).toBe(204)
    const response2 = await api.get("/api/blogs")
    const finalLength = response2.body.length
    await expect(finalLength).toBe(initialLength - 1)
  })
}
)

describe("4.14 Test Suite", () => {
  test("4.14 patch likes", async () => {
    const response1 = await api.get("/api/blogs")
    const id = response1.body[0].id
    const response = await api.patch(`/api/blogs/${id}`).send({ likes: 100 })
    await expect(response.status).toBe(201)
    await expect(response.body.likes).toBe(100)
  })
}
)

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})