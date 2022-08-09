import { User } from "../models/user"
import { API_NodeJS, API_NodeLocal } from "./config"


export const listUsers = () => {
    const url = `/users`
    return API_NodeJS.get(url)
}

export const detailUsers = (id: string) => {
    const url = `/users/${id}`
    return API_NodeJS.get(url)
}

export const editUsers = (data: User) => {
    const url = `/users/${data._id}`
    return API_NodeJS.put(url, data)
}

export const editRoleUsers = (id: string) => {
    const url = `/users/${id}`
    return API_NodeJS.put(url)
}