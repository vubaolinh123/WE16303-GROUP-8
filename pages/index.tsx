import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";
import { imageOriginal, imageResize } from "../api/constants";
import Button from "../components/Shared/Button";
import { GetStaticProps } from "next";
import Image from "../components/Shared/Image";
import { Item } from "../models/type";
import Link from "next/link";
import Meta from "../components/Shared/Meta";
import MovieSlider from "../components/Movie/MovieSlider";
import type { NextPage } from "next";
import { getHomeData } from "../api/movies";
import { Fragment } from "react";

interface HomeProps {
  data: {
    [id: string]: Item[];
  };
  main: Item;
}

const Home: NextPage<HomeProps> = ({ data, main }) => {

  const ImageSlide: any = []
  return (
    <>
      <Meta
        title="Phim FPOLY"
        description="Xem những bộ phim yêu thích của bạn và chương trình TV trên website."
        image="/preview.png"
      />

      <div className="relative w-screen h-screen hidden md:flex justify-between items-center gap-6 md:px-20 px-10">
        <Image
          src={imageOriginal(main.backdrop_path)}
          opacity={0.5}
          className="w-screen h-screen absolute top-0 left-0 hidden md:block object-cover"
          alt=""
        />

        <div className="z-10 w-auto flex-1 flex justify-center items-center">
          <div className="flex flex-col items-start gap-4">
            <p className="md:text-5xl text-4xl text-gray-100 max-w-xl">
              {main.title || main.name}
            </p>
            <p className="md:text-xl text-lg max-w-xl text-gray-100 text-justify multiline-ellipsis">
              {main.overview}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href={`/movie/${main.id}/watch`}>
                <a>
                  <Button>
                    <FaPlayCircle />
                    <span>Xem Ngay</span>
                  </Button>
                </a>
              </Link>
              <Link href={`/movie/${main.id}`}>
                <a>
                  <Button>
                    <FaInfoCircle />
                    <span>Xem Thông Tin </span>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 justify-center items-center hidden md:flex min-w-[300px]">
          <Image
            className="z-10 w-[300px] rounded-xl"
            src={imageResize(`${main.poster_path}`, "w300")}
            alt=""
          />
        </div>
      </div>
      {Object.keys(data).map((item, index) => (
        <Fragment key={item}>
          <h1
            className={`text-2xl mb-3 md:ml-16 ml-4 text-white ${index === 0 ? "mt-16 md:mt-8" : "mt-8"
              }`}
          >
            {item}
          </h1>
          <MovieSlider data={data[item]} />
        </Fragment>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHomeData()

    const trending = data["Top Phim Thịnh Hành"];
    // main : data của bộ phim Hot nhất hiện tại để tự động Render lại Banner
    const main = trending[new Date().getDate() % trending.length];

    return {
      props: {
        data,
        main
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export default Home;
