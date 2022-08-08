import axios from "axios";
import { Detail } from "../models/type";
import { instance } from "./config";

const API_KEY: string = "aaa6da55e3c5a4fcac2c50e20c2f5c51"
const language: string = "vi-VI"
const paramMovie = `?api_key=${API_KEY}&language=${language}`

// Truyền id Phim vào hàm này để lấy dữ liệu Phim đó
const urlGetMovie = (idMovie: string) => {
    const urlGetOneMovie = `movie/${idMovie}?api_key=${API_KEY}&language=${language}`
    return urlGetOneMovie
}


export const getHomeData: () => Promise<any> = async () => {
    const HomeAPIRoutes: {
        [key: string]: { url: string; media_type: "tv" | "movie" };
    } = {
        "Top Phim Thịnh Hành": { url: `/trending/movie/week${paramMovie}`, media_type: "movie" },
        "Top Phim Phổ Biến": { url: `/movie/popular${paramMovie}`, media_type: "movie" },
        "Top Phim Đánh Giá Cao": { url: `/movie/top_rated${paramMovie}`, media_type: "movie" },
        "Chương Trình Truyền Hình Thịnh Hành": { url: `/trending/tv/week${paramMovie}`, media_type: "tv" },
        "Chương Trình Truyền Hình Phổ Biến": { url: `/tv/popular${paramMovie}`, media_type: "tv" },
        "Chương Trình Truyền Hình Đánh Giá Cao": { url: `/tv/top_rated${paramMovie}`, media_type: "tv" },
    };

    // lấy toàn bộ dữ liệu của phim
    // biến promises sẽ trả về 1 mảng gồm các URL để vòng map call API get liên tục
    // [
    //     '/trending/movie/week',
    //     '/movie/popular',
    // ]
    // console.log("HomeAPIRoutes",HomeAPIRoutes);
    const promises = await Promise.all(
        Object.keys(HomeAPIRoutes).map((item) => instance.get(HomeAPIRoutes[item].url))
    );
    // console.log("promises",promises);


    const data = promises.reduce((final, current, index) => {
        // console.log("final",final);
        // console.log("current",current);
        // console.log("index",index);
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

export const getMovieDetails: (id: string) => Promise<any> = async (id) => {
    const labels = ["data", "casts", "similar", "videos"];

    const result = (
        await Promise.all([
            instance.get(`/movie/${id}${paramMovie}`),
            instance.get(`/movie/${id}/credits${paramMovie}`),
            instance.get(`/movie/${id}/similar${paramMovie}`),
            instance.get(`/movie/${id}/videos${paramMovie}`),
        ])
    ).reduce((final, current, index) => {
        if (labels[index] === "data") {
            final[labels[index]] = current.data;
        } else if (labels[index] === "casts") {
            final[labels[index]] = current.data.cast
                .filter((item: any) => item.name && item.character && item.profile_path)
                .slice(0, 10);
        } else if (labels[index] === "similar") {
            final[labels[index]] = current.data.results.map((item: any) => ({
                ...item,
                media_type: "movie",
            }));
        } else if (labels[index] === "videos") {
            final[labels[index]] = current.data.results.filter(
                (item: any) => item.name && item.site === "YouTube"
            );
        }

        return final;
    }, {} as any);

    return result;
};


export const getWatchMovieContent: (id: string) => Promise<any> = async (
    id
) => {
    const labels = ["data", "similar"];

    const result = (
        await Promise.all([
            instance.get(`/movie/${id}${paramMovie}`),
            instance.get(`/movie/${id}/similar${paramMovie}`),
        ])
    ).reduce((final, current, index) => {
        if (labels[index] === "data") {
            final[labels[index]] = current.data;
        } else if (labels[index] === "similar") {
            final[labels[index]] = current.data.results.map((item: any) => ({
                ...item,
                media_type: "movie",
            }));
        }
        return final;
    }, {} as any);

    return result;
};


export const getTVDetails: (id: string) => Promise<any> = async (id) => {
    const labels = ["data", "casts", "similar", "videos"];

    const result = (
        await Promise.all([
            instance.get(`/tv/${id}${paramMovie}`),
            instance.get(`/tv/${id}/credits${paramMovie}`),
            instance.get(`/tv/${id}/similar${paramMovie}`),
            instance.get(`/tv/${id}/videos${paramMovie}`),
        ])
    ).reduce((final, current, index) => {
        if (labels[index] === "data") {
            final[labels[index]] = current.data;
        } else if (labels[index] === "casts") {
            final[labels[index]] = current.data.cast
                .filter((item: any) => item.name && item.character && item.profile_path)
                .slice(0, 10);
        } else if (labels[index] === "similar") {
            final[labels[index]] = current.data.results.map((item: any) => ({
                ...item,
                media_type: "tv",
            }));
        } else if (labels[index] === "videos") {
            final[labels[index]] = current.data.results.filter(
                (item: any) => item.name && item.site === "YouTube"
            );
        }

        return final;
    }, {} as any);

    return result;
};

export const getTVSeasons: (id: string) => Promise<any> = async (id) => {
    const data = (await instance.get(`/tv/${id}${paramMovie}`)).data as Detail;

    if (data.seasons.length === 0) throw new Error("404");

    const res = await Promise.all(
        data.seasons.map((item) =>
            instance.get(`/tv/${id}/season/${item.season_number}${paramMovie}`)
        )
    );

    const seasons = res
        .map((item) => item.data)
        .filter(
            (item) =>
                item.name &&
                item.poster_path &&
                item.episodes.length > 0 &&
                item.episodes.every((child: any) => child.name && child.still_path)
        );

    return {
        seasons,
        data,
    };
};


export const search: (query: string, page?: number) => Promise<any> = async (
    query,
    page = 1
) => {
    const data = (await instance.get(`search/multi?api_key=${API_KEY}&query=${query}&page=${page}&language=${language}`))
        .data;

    return {
        ...data,
        results: data.results.filter((item: any) => item.poster_path),
    };
};


export const detailMovie = async (id: string) => {
    const data = (await instance.get(`movie/${id}?api_key=${API_KEY}&language=${language}`)).data;
    return {
        ...data
    };

    // const url = `movie/${id}?api_key=${API_KEY}&language=${language}`
    // return instance.get(url)
};

// export const detailMovie: (id: string) => Promise<any> = async (id: string) => {
//     const data = (await instance.get(`movie/${id}?api_key=${API_KEY}&language=${language}`)).data;
//     return {
//         ...data
//     };
// };
