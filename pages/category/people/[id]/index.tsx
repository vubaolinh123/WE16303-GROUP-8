import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import PeopleView from "../../../../components/Layout/PeopleView";
import { getPeopleDetail } from "../../../../api/category";
import { Cast, Detail } from "../../../../models/type";

interface MovieProps {
    data: any;
    casts: Cast[];
    crew: any;
}

const PeopleCategory: NextPage<MovieProps> = (props) => {
    return <PeopleView {...props} />;
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
    const movieId = params?.id as string;

    try {
        const response = await getPeopleDetail(movieId);
        return {
            props: {
                data: response.data,
                casts: response.movie_credits.cast,
                crew: response.movie_credits.crew,
                ...response
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

export default PeopleCategory;