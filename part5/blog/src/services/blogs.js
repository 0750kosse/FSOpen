import axios from 'axios'
const baseUrl = 'http://localhost:8080/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create post service & passing user token
const createBlog =  async (blogOject) => {
  const config = {
    headers : {Authorization : token}
  }
  
  const response = await axios.post(baseUrl, blogOject, config )
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken }