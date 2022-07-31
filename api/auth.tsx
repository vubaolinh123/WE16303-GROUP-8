import { IUser } from "../models/type";
import instance from "./config";

export const signup = (user: IUser) => {
    return instance.post(`https://phim-poly.herokuapp.com/api/signup`, user)   
}
export const signin = (user: IUser) => {
    return instance.post(`https://phim-poly.herokuapp.com/api/signin`, user)   
}
export const signinwithnextauth = (user: any) => {
    return instance.post(`https://phim-poly.herokuapp.com/api/signinwithnextauth`, user)   
}