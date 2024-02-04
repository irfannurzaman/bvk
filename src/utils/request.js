import Axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/';


const headers = {
    'Accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGJjNzU0Y2NlNzAxYzRjYzY5NDg3MjMyYjlmZGNlMSIsInN1YiI6IjY1YmNmNWM5YzE0NGRkMDE3YzAxMDhkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HiYC95BFhYK386WnFQq-faj2YOB_JjC2JlgYF9Xiu1E'
};
export default class baseRequest {
    constructor() {
        this.urls = {};
    }


    async get(url) {
        const Request = Axios.create({
            headers: headers
        });
        const res = Request.get(`${baseURL}${url}`)
        return (await res).data
    }


    async post(url, params = {}) {
        const Request = Axios.create({
            headers: headers
        });
        const res = Request.post(`${baseURL}${url}`, params)
        return (await res).data
    }

}