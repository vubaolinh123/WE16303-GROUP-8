import { NextPage } from 'next'
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../../components/Shared/Meta'
import { getlistfavorite, removefavorite } from '../../features/favorite/favorite.slice'
import {getMovieDetails, getTVDetails} from "../../api/movies"
import MovieCard from '../../components/Movie/MovieCard'
import { Item } from '../../models/type'
import { toast } from 'react-toastify';

const FavoriteList: NextPage = () => {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.auth.value.user._id)
  const listFavorite = useSelector((state: any) => state.favorite.listfavorite)
  const {listfavoritemovie, listfavoritetv} = listFavorite
    
  const [listMovie, setListMovie] = useState<Item[]>([])
  const [listTV, setListTV] = useState<Item[]>([])

  const handleRemoveFavorite = async (mediaId: string, name: string | undefined) => {
    try {
      await dispatch(removefavorite({mediaId, userId}) as any).unwrap();
      dispatch(getlistfavorite(userId)as any).unwrap();
      toast.success(`Đã xóa ${name} khỏi danh sách yêu thích`);
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  }

  useEffect(() => {
    dispatch(getlistfavorite(userId)as any).unwrap();
    (async () => {
      Promise.all(listfavoritemovie.map( async (item: any): Promise<any> => {
        const {data} = await getMovieDetails(item.mediaId);
        return data
      })).then((value:any) => setListMovie(value))

      Promise.all(listfavoritetv.map( async (item: any): Promise<any> => {
        const {data} = await getTVDetails(item.mediaId);
        return {...data, media_type: "tv"}
      })).then((value:any) => setListTV(value))
    })()    
  }, [listfavoritemovie.length || listfavoritetv.length])

  return (
    <>
      <Meta
        title="User profile"
        description="User profile"
        image="/not-found.png"
      />
      <div className='min-h-screen'>
        <div className="pt-20 px-14 account-content">
          <div className="flex justify-between items-baseline">
            <h1 className='text-[24px] text-white'>Danh sách của tôi</h1>
          </div>
          <Tabs tabPosition={'top'} className="min-h-screen">
            <TabPane tab="Phim chiếu rạp" key="1">
              <div className="">
                  {/* {listFavoriteMedia !== [] && <h2 className='text-[20px] text-white'>Phim chiếu rạp</h2>} */}
                <div
                    className="grid justify-center gap-5"
                    style={{
                        gridGap: 20,
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    }}
                >
                  {listMovie && listMovie.map((item) => (
                    <div key={item.id} className='relative my-list__movie-card'>
                      <MovieCard item={item} width="100%" height={'270px'} />
                      <button 
                      onClick={() => {handleRemoveFavorite(item.id.toString(), item.title)}}
                      className='relative top-[-335px] left-[130px]'
                      >x</button>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
            <TabPane tab="TV Show" key="2">
              <div className="">
                <div
                    className="grid justify-center gap-5"
                    style={{
                        gridGap: 20,
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    }}
                >
                  {listTV && listTV.map((item) => (
                    <div key={item.id} className='relative my-list__movie-card'>
                        <MovieCard item={item} key={item.id} width="100%" height={'270px'} />
                        <button 
                        onClick={() => {handleRemoveFavorite(item.id.toString(), item.name)}}
                        className='relative top-[-335px] left-[130px]'
                        >x</button>
                    </div>
                  ))}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default FavoriteList
