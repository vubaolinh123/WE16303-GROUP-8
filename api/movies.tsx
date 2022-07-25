import { Detail } from "../models/type";
import instance from "./config";

const API_KEY: string = "aaa6da55e3c5a4fcac2c50e20c2f5c51"
const language: string = "vi-VI"

// Truyền id Phim vào hàm này để lấy dữ liệu Phim đó
const urlGetMovie = (idMovie: string) => {
    const urlGetOneMovie = `movie/${idMovie}?api_key=${API_KEY}&language=${language}`
    return urlGetOneMovie
}


export const getHomeData: () => Promise<any> = async () => {
    const HomeAPIRoutes: {
        [key: string]: { url: string; media_type: "tv" | "movie" };
    } = {
        "Top Phim Thịnh Hành": { url: `/trending/movie/week?api_key=${API_KEY}&language=${language}`, media_type: "movie" },
        "Top Phim Phổ Biến": { url: `/movie/popular?api_key=${API_KEY}&language=${language}`, media_type: "movie" },
        "Top Phim Đánh Giá Cao": { url: `/movie/top_rated?api_key=${API_KEY}&language=${language}`, media_type: "movie" },
        "Chương Trình Truyền Hình Thịnh Hành": { url: `/trending/tv/week?api_key=${API_KEY}&language=${language}`, media_type: "tv" },
        "Chương Trình Truyền Hình Phổ Biến": { url: `/tv/popular?api_key=${API_KEY}&language=${language}`, media_type: "tv" },
        "Chương Trình Truyền Hình Đánh Giá Cao": { url: `/tv/top_rated?api_key=${API_KEY}&language=${language}`, media_type: "tv" },
    };

    // lấy toàn bộ dữ liệu của phim
    // biến promises sẽ trả về 1 mảng gồm các URL để vòng map call API get liên tục
    // [
    //     '/trending/movie/week',
    //     '/movie/popular',
    // ]
    const promises = await Promise.all(
        Object.keys(HomeAPIRoutes).map((item) => instance.get(HomeAPIRoutes[item].url))
    );

    const data = promises.reduce((final, current, index) => {
        final[Object.keys(HomeAPIRoutes)[index]] = current.data.results.map(
            (item: any) => ({
                ...item,
                media_type: HomeAPIRoutes[Object.keys(HomeAPIRoutes)[index]].media_type,
            })
        );
        return final;
    }, {} as any);

    return data;

}
