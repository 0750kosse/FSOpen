import axios from "axios";
const baseUrl = "http://localhost:8080/api/notes";
// token === private variable, whose value can be changed with the setToken()
// setToken() is exported by the module .create, which sets tthe token to headers,
// and this is given to axios as a third parameter of the post method
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = { 
    headers : {Authorization : token}
  }
  const request = axios.post(baseUrl, newObject, config);
  return request.then((res) => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

export default { getAll, create, update, setToken };
