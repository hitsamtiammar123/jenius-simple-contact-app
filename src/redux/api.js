import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 
  'http://localhost:3001/' : 
  'https://simple-contact-crud.herokuapp.com/'

const instance = axios.create({
  baseURL,
  headers: {
    "access-control-expose-headers": "WWW-Authenticate,Server-Authorization",
    "content-type": "application/json; charset=utf-8",
  }
});

export default instance;