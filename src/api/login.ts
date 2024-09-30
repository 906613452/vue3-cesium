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
interface orgsList {
    regionCode:string,
    name?:string,
    townCode?:string,
    typeId?:string
}

const ax = useAxios()
export const login = {
    login: (params:login) : Promise<AxiosResponse> => ax.post(`/api/wechat-sign-in`, params),
    signUp: (params:signUp) : Promise<AxiosResponse> => ax.post(`/api/wechat-sign-up`, params),
    getFarmMachinery: (id:string) : Promise<AxiosResponse> => ax.get(`/api_farm/farm/farm/farmMachinery?id=${id}`),
    getOrgsList: (params:orgsList) : Promise<AxiosResponse> => ax.post(`/api_user/user/cooperative/listAllCooperative`,params),
    
//     // getGeojson: () : Promise<AxiosResponse> => ax.get(`../assets/json/qingdaoRoad.geojson`),
}