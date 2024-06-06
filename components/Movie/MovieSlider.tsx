import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Item } from "../../models/type";
import MovieCard from "./MovieCard";
import type { NextPage } from "next";

interface MovieSliderProps {
    data: any;
    loop?: boolean;
}

const MovieSlider: NextPage<MovieSliderProps> = ({ data, loop }) => {

    return (
        <Swiper
            className="!w-[calc(100vw-16px)] md:!px-14 !px-2"
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            slidesPerView="auto"
            loop={loop}
            slidesPerGroupAuto
            navigation
        >
            <div className="!flex">
                {data.map((item:any) => (
                    <SwiperSlide key={item.id} className="!w-[200px] !flex">
                        <MovieCard item={item} width={200} height={300} />
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    );
};

export default MovieSlider;
