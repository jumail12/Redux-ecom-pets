import axios from "axios";
import Cookies from 'js-cookie';

export const axiosInstance =axios.create({
    
baseURL:"https://localhost:7170/api",
headers:{
    'Content-Type': 'application/json',
},
timeout: 10000,

});
axiosInstance.interceptors.request.use(
    config=>{
        const token = Cookies.get('token'); 
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },


    error=>{
       return Promise.reject(error);
    }
    
);
