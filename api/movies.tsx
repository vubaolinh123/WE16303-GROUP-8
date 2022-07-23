import axios from "axios";
import { Detail } from "../models/type";
import instance from "./config";

const API_KEY: string = "aaa6da55e3c5a4fcac2c50e20c2f5c51"
const language: string = "vi-VI"

const urlGetMovie = (idMovie: string) => {
    const urlGetOneMovie = `movie/${idMovie}?api_key=${API_KEY}&language=${language}`
    return urlGetOneMovie
}


export const getBannerMovie = () => {
    const idMovie = "453395" // Doctor Strange
    const url = ""
    return instance.get(urlGetMovie(idMovie))
}
