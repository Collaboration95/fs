import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
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
       
      // const user = await loginService.login({ username, password });
      // setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const Logout =()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  const blogForm = () =>(
    <>
      <p>{user.username} logged-in  <button onClick={Logout}>Logout</button></p>
     {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
  <h2>Blogs</h2>
  {user === null ?
    <LoginForm handleLogin={handleLogin} username={username} password={password}  handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange}/>:
  blogForm()
  } 
    
    </div>
  )
}

export default App