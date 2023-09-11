import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
  return response.then(response => response.data).catch(error => {
    console.log('fail')
    return Promise.reject(error.response.data)
  }
  )

}


export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson
}