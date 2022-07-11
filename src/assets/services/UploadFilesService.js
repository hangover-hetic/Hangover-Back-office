import axios from 'axios'
class UploadFilesService {
    upload(file) {
        let formData = new FormData()
        formData.append('file', file)
        return axios.post('https://hangover.timotheedurand.fr/api/media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json, application/xml, text/plain, text/html, *.*',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
    }
    getFiles() {
        return axios.get('https://hangover.timotheedurand.fr/api/festivals', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
    }
}
export default new UploadFilesService()
