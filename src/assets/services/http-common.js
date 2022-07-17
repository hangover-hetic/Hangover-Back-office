import axios from 'axios'

export const http = axios.create({
    baseURL: `https://hangover.timotheedurand.fr/api/`,

    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

if (localStorage.getItem('token')) {
    http.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
}
