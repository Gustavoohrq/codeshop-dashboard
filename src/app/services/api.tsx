import axios from 'axios';
axios.defaults.baseURL = process.env.URL_API || "http://localhost:8080"
export default axios;