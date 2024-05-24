
import { Comment } from "../models/comment"
import { API_NodeJS, } from "./config"


export const listComments = ()=>{
    const url = `comments`
    return API_NodeJS.get<Comment[]>(url)
}

export const listCommentsByVideo = (id: string)=>{
    const url = `comments/${id}/video`
    return API_NodeJS.get<Comment[]>(url)
}

export const detailComments = (id: string) => {
    const url = `/comments/${id}`
    return API_NodeJS.get(url)
}

export const addComments = (data: Comment) => {
    const url = `/comments`
    return API_NodeJS.post(url,data)
}

export const editComments = (data: any) => {
    const url = `/comments/${data._id}`
    return API_NodeJS.put(url,data)
}

export const removeComments = (id: string) => {
    const url = `/comments/${id}`
    return API_NodeJS.delete(url)
}
