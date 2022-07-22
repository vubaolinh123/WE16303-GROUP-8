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

const MovieCard: NextPage<MovieCardProps> = ({ item, height, width }) => {
    return (
        <Link
            // href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}
            href="abc"
        >
            <a>
                <div className="rounded-lg overflow-hidden cursor-pointer group flex flex-col items-center">
                    <Image
                        style={{ height, width }}
                        className="group-hover:brightness-75 object-cover"
                        src={imageResize("https://image.tmdb.org/t/p/w300/61PVJ06oecwvcBisoAQu6SDfdcS.jpg")}
                        alt=""
                    />
                    <p className="p-2 h-[60px] w-full overflow-hidden bg-dark-darken group-hover:text-red transition duration-300">
                        TEST 101
                    </p>
                </div>
            </a>
        </Link >
    );
};

export default MovieCard;
