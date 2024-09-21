import { camera } from './camera'
import { login } from './login'

export function useApi() {
    const api = {
        login:login,
        camera:camera
    }
    return api
}