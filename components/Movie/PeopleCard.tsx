import Image from "../Shared/Image";
import Link from "next/link";
import type { NextPage } from "next";
import { imageResize } from "../../api/constants";

interface PeopleCarddProps {
    item: any;
    height: number | string;
    width: number | string;
}

const PeopleCard: NextPage<PeopleCarddProps> = ({ item, height, width }) => {
    return (
        <Link
            href={`/category/people/${item.id}`}
        >
            <a>
                <div className="relative rounded-lg overflow-hidden cursor-pointer group flex flex-col items-center ">
                    <div className="absolute top-1 right-3 translate-x-1/2 w-10 h-10 z-10 text-shadow-md">{item.popularity.toFixed(0)}</div>
                    <Image
                        style={{ height, width }}
                        className="group-hover:brightness-75 transition-transform duration-300 transform hover:scale-125 object-cover"
                        src={imageResize(item.profile_path)}
                        alt=""
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent">
                        <div className="absolute bottom-2 px-2">
                            <div className="text-base font-medium z-50">{item.name }</div>
                            <div className="flex justify-between">
                                <div className="text-xs">{(item.original_name)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link >
    );
};

export default PeopleCard;