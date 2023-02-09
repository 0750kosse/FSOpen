import axios from "axios";
const baseUrl = "https://notesapp-backend.fly.dev/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((res) => { return res.data;});
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data);
};

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

export default { getAll, create, update, deleteNote };
