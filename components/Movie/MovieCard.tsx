import Image from "../Shared/Image";
import { Item } from "../../models/type";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../../api/constants";

interface MovieCardProps {
    item: Item;
    height: number | string;
    width: number | string;
}

const removeCharacters = (inputString: number) => {
    const suffixes = ['k', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];
    let suffixIndex = 0;
    while (inputString >= 1000 && suffixIndex < suffixes.length - 1) {
        inputString /= 1000;
        suffixIndex++;
    }
    const number = inputString.toFixed(1)
    return number
}

const MovieCard: NextPage<MovieCardProps> = ({ item, height, width }) => {
    return (
        <Link
            href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}
        >
            <a>
                <div className="relative rounded-lg overflow-hidden cursor-pointer group flex flex-col items-center ">
                    <div className="absolute top-1 right-3 translate-x-1/2 w-10 h-10 z-10 text-shadow-md">{item.vote_average.toFixed(1)}</div>
                    <Image
                        style={{ height, width }}
                        className="group-hover:brightness-75 transition-transform duration-300 transform hover:scale-125 object-cover"
                        src={imageResize(item.poster_path)}
                        alt=""
                    />
                    {/* <div className="mx-auto p-2 h-[60px] w-full overflow-hidden bg-dark-darken group-hover:text-red transition duration-300"> */}
                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent">
                        <div className="absolute bottom-2 px-2">
                            <div className="text-base font-medium z-50">{item.title || item.name}</div>
                            <div className="flex justify-between">
                                <div className="text-xs">{removeCharacters(item.popularity)}k xem</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link >
    );
};

export default MovieCard;
