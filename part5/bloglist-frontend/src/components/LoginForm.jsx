import React , { useState } from "react"
import PropTypes from "prop-types"
const LoginForm = ({ handleLogin }) => {
  const [newUsername,setNewUsername] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const triggerLogin = (event) => {
    event.preventDefault()
    handleLogin(newUsername,newPassword)
    setNewUsername("")
    setNewPassword("")
  }
  return (
    <form onSubmit={triggerLogin}>
      <div>
        username
        <input
          type="text"
          value={newUsername}
          name="Username"
          onChange={event => setNewUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={newPassword}
          name="Password"
          onChange={event => setNewPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm