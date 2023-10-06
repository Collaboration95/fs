const blog = require("../models/blog")


const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))]
  const likesByAuthor = {}
  uniqueAuthors.forEach(author => {
    likesByAuthor[author] = blogs.filter(blog => blog.author===author).reduce(( sum,blog ) => sum+blog.likes,0)
  })
  const maxLikes = Math.max(...Object.values(likesByAuthor))
  const authorWithMaxLikes = Object.keys(likesByAuthor).find(key => likesByAuthor[key] === maxLikes)
  return authorWithMaxLikes
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = {}
  const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))]
  uniqueAuthors.forEach(author => {
    blogsByAuthor[author] = blogs.filter(blog => blog.author===author).length
  })

  const maxBlogs = Math.max(...Object.values(blogsByAuthor))
  const authorWithMaxBlogs = Object.keys(blogsByAuthor).find(key => blogsByAuthor[key] === maxBlogs)
  return authorWithMaxBlogs
}



const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return max.likes > item.likes ? max : item
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer , 0)
}


module.exports = {
    totalLikes,
    favoriteBlog,
    mostLikes,
    mostBlogs
}