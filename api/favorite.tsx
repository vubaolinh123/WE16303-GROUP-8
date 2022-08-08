import {API_NodeJS} from "./config";

export const addFavoriteMedia = (item: any) => {
    return API_NodeJS.post(`favorite`, item)   
}

export const removeFavoriteMedia = (id: string) => {
    return API_NodeJS.delete(`favorite/${id}`)   
}

export const getListFavoriteMedia = (userId: string) => {
    return API_NodeJS.get(`favorite/${userId}`)
}

export const getListFavoriteFromUser = (user: any) => {

}