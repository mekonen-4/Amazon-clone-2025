import axios from 'axios' 

const axiosInstance = axios.create({
    // baseURL:'http://127.0.0.1:5001/clone-1d560/us-central1/api'
    baseURL:'https://amazon-api-deploy-n46g.onrender.com'
});
export {axiosInstance};