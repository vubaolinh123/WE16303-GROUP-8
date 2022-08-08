import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../../components/Shared/Meta'
import { getlistmedia } from '../../features/favorite/favorite.slice'
import {getMovieDetails} from "../../api/movies"
import MovieCard from '../../components/Movie/MovieCard'
import { Item } from '../../models/type'

interface MyListProps {
  data: Item[]
}

const FavoriteList: NextPage<MyListProps> = () => {
  const dispatch = useDispatch();
  const [userId, listFavorite] = [useSelector((state: any) => state.auth.value.user._id), useSelector((state: any) => state.favorite.value)]
  const [listFavoriteMedia, setListFavoriteMedia] = useState<Item[]>([])
  

  useEffect(() => {
    (async () => {
      await dispatch(getlistmedia(userId) as any).unwrap()
      Promise.all(listFavorite.map( async (item: any): Promise<any> => {
        const {data} = await getMovieDetails(item.mediaId);
        return data
      })).then((value:any) => setListFavoriteMedia(value))
    })()
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
              {listFavoriteMedia !== [] && <h2 className='text-[20px] text-white'>Phim chiếu rạp</h2>}
            <div
                className="grid justify-center gap-5"
                style={{
                    gridGap: 20,
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                }}
            >
              {listFavoriteMedia && listFavoriteMedia.map((item) => (
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
