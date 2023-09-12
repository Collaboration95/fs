import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const serverUrl = 'http://localhost:3001/countries'

const getCloudAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getLocalAll = () => {
    return axios.get(serverUrl);
}

const addLocalCountry = async () => {
    const request = await getCloudAll();
    const data = request.data;
    return axios.post(serverUrl,data);
}

const getCloudCountry = (name) => {
    return axios.get(`${baseUrl}/name/${name}`)
}

export default { getCloudAll, getLocalAll, addLocalCountry, getCloudCountry}