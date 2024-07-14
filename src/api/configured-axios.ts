import Axios from 'axios'

interface list {
    perPage?: string | number,
    currentPage?: string | number,
    name?: string,
    phone?: string
}
interface templateIds {
    templateIds: Array<string>
}


export function useAxios() {
    const changeParams = (params: any) => {
        let data = removeEmptyValues(params)
        console.log(data)
        return Object.entries(data).length ? `?${new URLSearchParams(data)}` : '';
    }
    const removeEmptyValues = (obj: any) => {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            } else if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
                delete obj[key];
            }
        }
        return obj;
    }
    const axios = Axios.create({
        baseURL: import.meta.env.VITE_API_HOST,
        timeout: 30000 // 30 seconds
    })

    axios.interceptors.request.use((config:any) => {
        const accessToken = localStorage.getItem('accessToken')

        // const accessToken = user?.accessToken
        if (config.headers) {
            config.headers['Accept-Language'] = 'zh'
            config.headers['ngrok-skip-browser-warning'] = '123'
            accessToken && (config.headers.Authorization = `Bearer ${accessToken}`)
        }
        return config
    })

    axios.interceptors.response.use(
        (response:any) => Promise.resolve(response.data),
        (error:any) => {
            console.log('error in requesting', error)
            console.log(error.response.data.message)

            if ([401, 403].includes(error.response && error.response.status)) {
                // dispatch({ type: 'logout', payload: null })
            }
            return Promise.reject(
                error.response
                    ? { message: error.response.data.message }
                    : { message: '服务器发生了一些错误，请稍后再试' }
            )
        }
    )
    
    return axios
}

