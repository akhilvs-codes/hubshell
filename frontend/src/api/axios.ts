

import axios from "axios"

const axiosApi = axios.create({
    baseURL: "https://localhost:8000/api"
})

export default axiosApi