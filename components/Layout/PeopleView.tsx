import { Cast, Detail, Item, VideoTrailer } from "../../models/type";
import { FaBookmark, FaPlayCircle, FaYoutube } from "react-icons/fa";
import { Fragment, useState } from "react";
import { imageOriginal, imageResize } from "../../api/constants";
import { FaTimes } from "react-icons/fa";
import Image from "../Shared/Image";
import Link from "next/link";
import Meta from "../Shared/Meta";
import MovieSlider from "../Movie/MovieSlider";
import type { NextPage } from "next";
import StarRating from "../Display/StarRating";
import { useDispatch, useSelector } from "react-redux";

interface ItemViewProps {
    data: any;
    casts: Cast[];
    crew: any;

}

const PeopleView: NextPage<ItemViewProps> = ({ data, casts, crew }) => {
    const dispatch = useDispatch()
    const { _id: userId } = useSelector((state: any) => state.auth.value);

    return (
        <>
            <Meta
                title={`${data.known_for_department} - ${data.name}`}
                description="Xem Thêm Thông Tin"
                image={imageOriginal(data.profile_path)}
            />
            <div className="relative min-h-screen">
                <div
                    style={{
                        backgroundImage: `url("${imageOriginal(data.profile_path)}")`,
                        backgroundPosition: "50%",
                    }}
                    className="mask-image bg-no-repeat bg-cover w-screen h-[350px] md:h-[500px] absolute top-0 left-0 opacity-50 block z-[-1]"
                ></div>
                <div className="md:pt-52 pt-24 px-6 md:px-20 flex flex-col md:flex-row gap-5">
                    <div className="md:w-[300px] w-full flex-shrink-0 flex justify-center items-start">
                        <Image
                            className="rounded-xl"
                            src={imageResize(data.profile_path, "w300")}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col justify-start gap-3">
                        <div className="text-4xl">
                            {data.name}
                        </div>
                        {data.birthday && <div>Ngày sinh: {data.birthday} </div>}
                        {data.gender && <div>Giới tính: {data.gender == 1 ? "Nữ" : "Nam"}</div>}
                        {data.place_of_birth && (
                            <div>Nơi sinh: {data.place_of_birth}</div>
                        )}
                        {data.popularity && (
                            <div>Yêu thích: {data.popularity}</div>
                        )}
                        <div className="flex items-center">
                            {data.vote_average ? (
                                <StarRating
                                    stars={Math.round(data.vote_average)}
                                    maximum={10}
                                    extraText={` (${data.vote_count} votes)`}
                                />
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                {casts && (
                    <>
                        <h1 className="my-10 text-2xl px-6 md:px-20 text-gray-100">Những Bộ Phim Của {data.name}</h1>
                        <MovieSlider data={casts} loop={false} />
                    </>

                )}
                {crew && crew.length > 0 && (
                    <>
                        <h1 className="my-10 text-2xl px-6 md:px-20 text-gray-100">Phim Nổi Bật</h1>
                        <MovieSlider data={crew} loop={false} />
                    </>
                )}
            </div>
        </>
    );
};

export default PeopleView;