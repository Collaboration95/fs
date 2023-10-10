import axios from "axios"
const baseUrl = "http://localhost:3001/api/login"

const login = async credentials => {
  console.log("login.js: login: credentials: ", credentials)
  const response = await axios.post(baseUrl, credentials)
  if (response.status !== 200) {
    console.log("login.js: login: response: ", response)
    return null
  }
  return response.data
}

export default { login }