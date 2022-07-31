import instance from "./config";

const API_KEY: string = "aaa6da55e3c5a4fcac2c50e20c2f5c51"
const language: string = "vi-VI"



export const getCategoryData: () => Promise<any> = async () => {
    const CategoryAPIRoutes: {
        [key: string]: { url: string };
    } = {
        "MovieCategory": { url: `/genre/movie/list?api_key=${API_KEY}&language=${language}` },
        "TVCategory": { url: `/genre/tv/list?api_key=${API_KEY}&language=${language}` },

    };

    const promises = await Promise.all(
        Object.keys(CategoryAPIRoutes).map((item) => instance.get(CategoryAPIRoutes[item].url))
    );


    const data = promises.reduce((final, current, index) => {
        final[Object.keys(CategoryAPIRoutes)[index]] = current.data.genres.map(
            (item: any) => ({
                ...item
            })
        );

        return final;
    }, {} as any);

    return data;

}

export const getDefaultMovie: (page?: number) => Promise<any> = async (page = 1) => {
    const data = (await instance.get(`/trending/movie/week?api_key=${API_KEY}&language=${language}&page=${page}`)).data;
    return {
        ...data
    };
};

export const getDefaultTVShow: (page?: number) => Promise<any> = async (page = 1) => {
    const data = (await instance.get(`/trending/tv/week?api_key=${API_KEY}&language=${language}&page=${page}`)).data;
    return {
        ...data
    };
};


// export const sortMovie: (page?: number, genres?: string, language?: string, year?: number, sort?: string) => Promise<any> = async (page = 1,genres?: string, language?: string,  year?: number,sort?: string) => {
//     const data = (await instance.get(`/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&year=${year}&with_original_language=${language}&with_genres=${genres}&with_watch_monetization_types=flatrate`)).data;
//     return {
//         ...data
//     };
// };

export const sortMovie: (page?: number, genres?: string, languageSort?: string,  year?: number, sort?: string) => Promise<any> = async (page = 1,genres?: string, languageSort?: string, year?: number,sort?: string) => {
    console.log(`/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=${sort}&with_original_language=${languageSort}&include_adult=false&include_video=false&page=${page}&year=${year}&with_genres=${genres}&with_watch_monetization_types=flatrate` );
    
    const data = (await instance.get(`/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=${sort}&with_original_language=${languageSort}&include_adult=false&include_video=false&page=${page}&year=${year}&with_genres=${genres}&with_watch_monetization_types=flatrate`)).data;
    return {
        ...data
    };
};

export const getMovieByCategory: (page?: number, genres?: string) => Promise<any> = async (page = 1,genres?: string) => {
    const data = (await instance.get(`/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genres}&with_watch_monetization_types=flatrate`)).data;
    return {
        ...data
    };
};

export const sortTVShow: (page?: number, genres?: string, languageSort?: string,  year?: string, sort?: string) => Promise<any> = async (page = 1,genres?: string, languageSort?: string, year?: string,sort?: string) => {
    // console.log(`/discover/tv?api_key=${API_KEY}&language=${languageSort}&sort_by=${sort}&include_adult=false&include_video=false&page=${page}&first_air_date.lte=${year}&with_genres=${genres}&with_original_language=${language}&with_watch_monetization_types=flatrate` );
    
    // const url = `discover/tv?api_key=aaa6da55e3c5a4fcac2c50e20c2f5c51&language=vi-VI&sort_by=popularity.desc&page=1&timezone=Asia%2FHo_Chi_Minh&include_null_first_air_dates=false&with_original_language=ko&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    // console.log("url",url);
    
    const url2 = `/discover/tv?api_key=${API_KEY}&language=${language}&sort_by=${sort}&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=${languageSort}&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    console.log("url2",url2);
    
    // const data = (await instance.get(`/discover/tv?api_key=${API_KEY}&with_genres=${genres}&with_original_language=${languageSort}&sort_by=${sort}&page=${page}&timezone=Asia%Ho_Chi_Minh&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`)).data;
    // return {
    //     ...data
    // };
    const data = (await instance.get(url2)).data;
    return {
        ...data
    };
};

export const getTVShowByCategory: (page?: number, genres?: string) => Promise<any> = async (page = 1,genres?: string) => {
    const data = (await instance.get(`/discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genres}&with_watch_monetization_types=flatrate`)).data;
    return {
        ...data
    };
};


