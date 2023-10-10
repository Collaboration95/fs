import Togglable from "./Toggleable"
import PropTypes from "prop-types"

const Blog = ({ blog ,addLike,removeBlog,user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }
  const addlike = () => {
    const blogObject = { ...blog,likes:blog.likes+1 }
    addLike(blogObject)
  }
  const removeblog=() => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }
  const deleteButton = () => {
    if(user===blog.user.username){
      return(<button onClick={removeblog}>remove</button>)
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
        {deleteButton()}
      </Togglable>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog