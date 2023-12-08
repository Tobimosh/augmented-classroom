import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://augmented-classroom.onrender.com'
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint
    }

    register = (data: T) => {
        return axiosInstance.post<T>(this.endpoint, data).then(res => res.data);
    }

    login = () => {
        return axiosInstance.get(this.endpoint).then(res => res.data);
    }
}

export default APIClient;