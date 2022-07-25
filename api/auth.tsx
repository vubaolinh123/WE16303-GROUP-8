import { IUser } from "../models/type";
import instance from "./config";

export const signup = (user: IUser) => {
    const url = `http://localhost:3001/api/signup`;
    return instance.post(url, user)   
}
export const signin = (user: IUser) => {
    const url = `http://localhost:3001/api/signin`;
    return instance.post(url, user)   
}