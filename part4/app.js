const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const loginRouter = require("./controllers/login")
const blogsRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const logger = require("./utils/logger")
// app.use(express.static("dist"))
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.get("/", (request, response) => {
    response.send("<h1>Hello World!</h1>")
  })

app.use("/api/blogs", blogsRouter)
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
