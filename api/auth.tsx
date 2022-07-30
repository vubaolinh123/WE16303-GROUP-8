import { IUser } from "../models/type";
import instance from "./config";

export const signup = (user: IUser) => {
    return instance.post(`http://localhost:3001/api/signup`, user)   
}
export const signin = (user: IUser) => {
    return instance.post(`http://localhost:3001/api/signin`, user)   
}
export const signinwithnextauth = (user: any) => {
    return instance.post(`http://localhost:3001/api/signinwithnextauth`, user)   
}