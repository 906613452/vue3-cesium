import { AxiosResponse } from "axios";
import { useAxios } from "./camera-axios";



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
export const camera = {
    getToken: (params:signUp) : Promise<AxiosResponse> => ax.post(`/api/lapp/token/get`, {
        appKey:'3fa4047bacf24594a31d5b2cef52aa87',
        appSecret:'17492ff9919a957ad0f4861674a583a1'
    }),
    // getFarmMachinery: (id:string) : Promise<AxiosResponse> => ax.get(`/api_farm/farm/farm/farmMachinery?id=${id}`),
    
//     // getGeojson: () : Promise<AxiosResponse> => ax.get(`../assets/json/qingdaoRoad.geojson`),
}