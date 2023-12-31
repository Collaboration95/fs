const bcrypt = require("bcrypt")
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("Blog", { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)

})
userRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body
    const unique = await User.find({ username })
    if (unique.length > 0) {
      return response.status(400).json({
        error: "username must be unique"
      })
    }
    if (!password || password.length < 3) {
      return response.status(400).json({
        error: "password must be at least 3 characters long"
      })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  })

module.exports = userRouter
