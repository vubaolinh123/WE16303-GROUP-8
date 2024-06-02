import { Cast, Detail, Item, VideoTrailer } from "../../../models/type";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import ItemView from "../../../components/Layout/ItemView";
import { getMovieDetails } from "../../../api/movies";

interface MovieProps {
    data: Detail;
    casts: Cast[];
    similar: Item[];
    videos: VideoTrailer[];
}

const Movie: NextPage<MovieProps> = (props) => {
    return <ItemView {...props} media_type="movie" />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const movieId = params?.id as string;

    try {
        const response = await getMovieDetails(movieId);
        return {
            props: {
                ...response,
            },
            revalidate: 3600,
        };
    } catch (error) {
        return {
            notFound: true,
            revalidate: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export default Movie;
