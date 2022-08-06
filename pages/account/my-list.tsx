import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../../components/Shared/Meta'
import { store } from "../../app/store"
import { getlistmovie } from '../../features/favoriteMovie/favoritemovie.slice'
import {getMovieDetails} from "../../api/movies"
import MovieCard from '../../components/Movie/MovieCard'
import { Item } from '../../models/type'

interface MyListProps {
  data: Item[]
}

const FavoriteList: NextPage<MyListProps> = () => {
  const dispatch = useDispatch();
  const [userId, listMovie] = [useSelector((state: any) => state.auth.value.user._id), useSelector((state: any) => state.favoriteMovie.value)]
  const [listFavoriteMovie, setListFavoriteMovie] = useState<Item[]>([])
  const [listFavoriteTv, setListFavoriteTv] = useState<Item[]>([])

  useEffect(() => {
    dispatch(getlistmovie(userId) as any).unwrap()
    Promise.all(listMovie.map( async (item: any): Promise<any> => {
      const {data} = await getMovieDetails(item.movieId);
      return data
    })).then((value:any) => setListFavoriteMovie(value))
    
  }, [userId])

  return (
    <>
      <Meta
        title="User profile"
        description="User profile"
        image="/not-found.png"
      />
      <div>
        <div className="py-20 h-screen px-14 account-content">
          <div className="flex justify-between items-baseline">
            <h1 className='text-[28px] text-white'>Danh sách của tôi</h1>
          </div>
          <div className="">
              {listFavoriteMovie !== [] && <h2 className='text-[20px] text-white'>Phim chiếu rạp</h2>}
            <div
                className="grid justify-center gap-5"
                style={{
                    gridGap: 20,
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
            >
              {listFavoriteMovie && listFavoriteMovie.map((item) => (
                  <MovieCard item={item} key={item.id} width="100%" height={270} />
              ))}
            </div>
          </div>
          <div className="">
              {listFavoriteTv !== [] && <h2 className='text-[20px] text-white'>TV Show</h2>}
            <div
                className="grid justify-center gap-5"
                style={{
                    gridGap: 20,
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
            >
              {listFavoriteTv && listFavoriteTv.map((item) => (
                  <MovieCard item={item} key={item.id} width="100%" height={270} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default FavoriteList
