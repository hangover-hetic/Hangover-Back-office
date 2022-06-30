
import axios from 'axios';


export const http = axios.create({
  baseURL: `https://hangover.timotheedurand.fr/api/`,
  
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + localStorage.getItem('token')
    
  },
})