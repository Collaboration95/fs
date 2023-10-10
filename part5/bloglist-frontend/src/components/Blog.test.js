import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

test("renders content", () => {
  const blog ={
    "title": "Testing for Blog",
    "author": "234",
    "url": "234",
    "likes": 0,
    "user": {
      "username": "test123",
      "id": "651d68b840a335fc753c9709"
    },
    "id": "6520736b93b807223d4aaee8"
  }
  const user = "test123"
  render(<Blog blog={blog} user={user} />)
  const titleElement = screen.getByText(new RegExp(`title: ${blog.title}`))
  expect(titleElement).toBeInTheDocument()
})