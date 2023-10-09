import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notifications from './components/Notifications'
import "./index.css"
import blogService from './services/blogs'
import Togglable from './components/Toggleable'
import loginService from './services/login'
import RenderBlogs from './components/RenderBlogs'

const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) 
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username,password) => {
    try {
       const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username/password combo');
      setTimeout(() => {setErrorMessage(null)}, 3000);
    }
  };

  const Logout =()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  const addNewBlogRef = useRef()

  const addNewBlog = (blogObject) => {
    addNewBlogRef.current.toggleVisibility()
     blogService
      .create(blogObject)
      .then(returnedBlog => {
        setErrorMessage(`a new blog , ${returnedBlog.title} by ${returnedBlog.author} Added`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
      })
      .catch(error => {
        setErrorMessage("Empty data not allowed")
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notifications message={errorMessage} />
      {user === null ?
      (<Togglable buttonLabel="reveal">
        <LoginForm handleLogin={handleLogin}/>
        </Togglable>)
      :
      (<>
        <p>{user.username} logged-in  <button onClick={Logout}>Logout</button></p>
        <Togglable buttonLabel="new blog" ref={addNewBlogRef}>
        <AddBlog addNewBlog={addNewBlog} />    
        </Togglable>
        <RenderBlogs />
        </>)
      } 
    </div>
  )
}

export default App