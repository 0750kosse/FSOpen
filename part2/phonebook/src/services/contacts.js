import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

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

export default { getAllContacts, createContact, deleteContact };
