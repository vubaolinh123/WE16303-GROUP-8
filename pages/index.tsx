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
import { signOut } from 'next-auth/react'

interface HomeProps {
  data: {
    [id: string]: Item[];
  };
  main: Item;
}

const Home: NextPage<HomeProps> = () => {
  const ImageSlide: any = []
  return (
    <>
      <Meta
        title="Cinema"
        description="Watch your favorite movies and TV shows in out website."
        image="/preview.png"
      />

      <div className="relative w-screen h-screen hidden md:flex justify-between items-center gap-6 md:px-20 px-10">
        <Image
          src="https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg"
          opacity={0.5}
          className="w-screen h-screen absolute top-0 left-0 hidden md:block object-cover"
          alt=""
        />

        <div className="z-10 w-auto flex-1 flex justify-center items-center">
          <div className="flex flex-col items-start gap-4">
            <p className="md:text-5xl text-4xl text-gray-100 max-w-xl">
              TEST MOVIE
            </p>
            <p className="md:text-xl text-lg max-w-xl text-gray-100 text-justify multiline-ellipsis">
              TEST Overview
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href={`/movie/test1010/watch`}>
                <a>
                  <Button>
                    <FaPlayCircle />
                    <span>Watch Now</span>
                  </Button>
                </a>
              </Link>
              <Link href={`/movie/test1010`}>
                <a>
                  <Button>
                    <FaInfoCircle />
                    <span>View Info</span>
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 justify-center items-center hidden md:flex min-w-[300px]">
          <Image
            className="z-10 w-[300px] rounded-xl"
            src={imageResize("https://image.tmdb.org/t/p/w300/61PVJ06oecwvcBisoAQu6SDfdcS.jpg", "w300")}
            alt=""
          />
        </div>
      </div>
      <h1 className={`text-2xl mb-3 md:ml-16 ml-4 mt-16 md:mt-8 `}> ITEM TEST ABC </h1>
      <MovieSlider data={ImageSlide["https://image.tmdb.org/t/p/w300/61PVJ06oecwvcBisoAQu6SDfdcS.jpg"]} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {

    return {
      props: {
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
