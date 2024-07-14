import { login } from './login'

export function useApi() {
    const api = {
        login:login,
    }
    return api
}