import Togglable from "./Toggleable"


const Blog = ({ blog ,addLike}) => {
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
  </Togglable>
    </div>
)
}

export default Blog 