import { User } from "../models/user"
import { API_NodeJS,API_NodeLocal } from "./config"


export const listUsers = ()=>{
    const url = `users`
    return API_NodeLocal.get(url)
}

export const detailUsers = (id: string) => {
    const url = `/users/${id}`
    return API_NodeLocal.get(url)
}

export const editUsers = (data: User) => {
    const url = `/users/${data._id}`
    return API_NodeLocal.put(url,data)
}

export const editRoleUsers = (id: string) => {
    const url = `/users/${id}`
    return API_NodeLocal.put(url)
}