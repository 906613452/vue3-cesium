import { AxiosResponse } from "axios";
import { useAxios } from "./configured-axios";



interface login {
    code:string,
    account:string,
    password:string
}
interface signUp {
    code:string,
    username:string,
    password:string
}

const ax = useAxios()
export const login = {
    login: (params:login) : Promise<AxiosResponse> => ax.post(`/api/wechat-sign-in`, params),
    signUp: (params:signUp) : Promise<AxiosResponse> => ax.post(`/api/wechat-sign-up`, params),
//     // getGeojson: () : Promise<AxiosResponse> => ax.get(`../assets/json/qingdaoRoad.geojson`),
}