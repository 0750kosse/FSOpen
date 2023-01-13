import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAllContacts = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createContact = (newEntry) => {
  const request = axios.post(baseUrl, newEntry);
  return request.then((res) => res.data);
};

const deleteContact = (id) => {
  const request = axios.delete(baseUrl + `/${id}`, id);
  return request.then((res) => res.data);
};

const updateContact = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const exportObject = {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
};

export default exportObject;
