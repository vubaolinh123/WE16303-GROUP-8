import { IUser } from "../models/type";
import {instance} from "./config";
import {API_NodeJS} from "./config";
export const signup = (user: IUser) => {
    return API_NodeJS.post(`signup`, user)   
}
export const signin = (user: IUser) => {
    return API_NodeJS.post(`signin`, user)   
}
export const signinwithnextauth = (user: any) => {
    return API_NodeJS.post(`signinwithnextauth`, user)   
}