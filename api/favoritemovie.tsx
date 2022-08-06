import {API_NodeJS, instance} from "./config";

const API_KEY: string = "aaa6da55e3c5a4fcac2c50e20c2f5c51"
const language: string = "vi-VI"


export const addFavoriteMovie = (user: any) => {
    return API_NodeJS.post(`favoritemovie`, user)   
}

export const removeFavoriteMovie = (id: string) => {
    return API_NodeJS.delete(`favoritemovie/${id}`)   
}

export const getListFavoriteMovie = (id: string) => {
    return API_NodeJS.get(`users/favoritemovie/${id}`)
}

export const getListFavoriteFromUser = (user: any) => {

}