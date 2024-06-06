import { Item } from "../../models/type";
import type { NextPage } from "next";
import Pagination from "../Display/Pagination";
import PeopleCard from "./PeopleCard";

interface MovieGridProps {
    data: Item[];
    currentPage: number;
    maximumPage: number;
    resolveLink: (page: number) => string;
}

const PeopleGrid: NextPage<MovieGridProps> = ({
    data,
    currentPage,
    maximumPage,
    resolveLink,
}) => {

    return (
        <>
            <h1
                className={`text-2xl mb-3 text-white mt-16 md:mt-8`}
            >
                Top Diễn Viên Được Yêu Thích
            </h1>
            <div
                className="grid justify-center gap-5"
                style={{
                    gridGap: 20,
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
            >
                {data.map((item) => (
                    <PeopleCard item={item} key={item.id} width="100%" height={270} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                {maximumPage > 1 && (
                    <Pagination
                        current={currentPage}
                        maximum={maximumPage}
                        resolveLink={resolveLink}
                    />
                )}
            </div>
        </>
    );
};

export default PeopleGrid;