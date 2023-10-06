import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Notifications from './components/Notifications'
import "./index.css"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newblog, setNewBlog] = useState({title:'',author:'',url:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) 
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('logging in with', username, password)
    try {
      // Perform your login logic here
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)

      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username/password combo');
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };
  const Logout =()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  const blogForm = () =>(
    <>
      
     {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
  const handleBlogChange = (event) => {
    const {name,value}  = event.target
    setNewBlog({...newblog,[name]:value})
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {...newblog}
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog , ${returnedBlog.title} by ${returnedBlog.author} Added`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
        setNewBlog({ title: '', author: '', url: '' });
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
    <LoginForm handleLogin={handleLogin} username={username} password={password}  handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange}/>:
  (<>
  <p>{user.username} logged-in  <button onClick={Logout}>Logout</button></p>
 <AddBlog addBlog={addBlog} handleBlogChange={handleBlogChange} newblog={newblog}/>    
  {blogForm()}
  </>)
  } 
    </div>
  )
}

export default App