import { IFavoriteMedia } from "../models/type";
import {API_NodeJS} from "./config";

export const addFavoriteMedia = (item: IFavoriteMedia) => {
    return API_NodeJS.post(`favorite`, item)   
}

export const removeFavoriteMedia = (item: IFavoriteMedia) => {
    return API_NodeJS.delete(`favorite/${item.userId}/${item.mediaId}`)   
}

export const getListFavoriteMovie = (userId: string) => {
    return API_NodeJS.get(`favorite/movie/${userId}`)
}

export const getListFavoriteTv = (userId: string) => {
    return API_NodeJS.get(`favorite/tv/${userId}`)
}