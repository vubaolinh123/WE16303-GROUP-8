
import { Comment } from "../models/comment"
import { API_NodeJS,API_NodeLocal } from "./config"


export const listComments = ()=>{
    const url = `comments`
    return API_NodeLocal.get<Comment[]>(url)
}

export const detailComments = (id: string) => {
    const url = `/comments/${id}`
    return API_NodeLocal.get(url)
}

export const addComments = (data: Comment) => {
    const url = `/comments`
    return API_NodeLocal.post(url,data)
}

export const editComments = (data: Comment) => {
    const url = `/comments/${data._id}`
    return API_NodeLocal.put(url,data)
}

export const removeComments = (id: string) => {
    const url = `/comments/${id}`
    return API_NodeLocal.delete(url)
}
