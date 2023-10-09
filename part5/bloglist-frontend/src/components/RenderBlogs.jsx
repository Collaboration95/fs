import React , { useState,useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'

const RenderBlogs = () => {

    const [blogs,setBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
      }, [blogs])

      const addLike = (blogObject) => {
        console.log(blogObject)
        blogService
          .patch(blogObject.id,{likes:blogObject.likes})
          .then(returnedBlog => {
            setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog))
          })      
        }


      const sortBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return (
            <>
            <h2>blogs</h2>
            {sortBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} />
            )}

            </>
           )
    }
export default RenderBlogs