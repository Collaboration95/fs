import Togglable from "./Toggleable"


const Blog = ({ blog ,addLike,removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const addlike = () => {
    const blogObject = {...blog,likes:blog.likes+1}
    addLike(blogObject)
  }
  const removeblog=()=>{
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }
  return (
    <div style={blogStyle}>
  title: {blog.title}  
  author: {blog.author}
    <br/>
  <Togglable buttonLabel="view">
    url: {blog.url}
    <br/>
    likes: {blog.likes} <button onClick={addlike}>like</button>
    <br/>
    <button onClick={removeblog}>remove</button>
  </Togglable>
    </div>
)
}

export default Blog 