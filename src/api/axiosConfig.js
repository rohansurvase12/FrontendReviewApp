import axios from 'axios';

export default axios.create({
   //   baseURL:'http://localhost:8080',

    baseURL : 'https://review-backend-6lon.onrender.com',
    //headers: {"ngrok-skip-browser-warning": "true"}
});