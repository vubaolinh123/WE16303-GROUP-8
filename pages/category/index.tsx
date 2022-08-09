import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";
import { imageOriginal, imageResize } from "../../api/constants";

import Button from "../../components/Shared/Button";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "../../components/Shared/Image";
import { Category, Item, PopularMovie } from "../../models/type";
import Link from "next/link";
import Meta from "../../components/Shared/Meta";
import MovieSlider from "../../components/Movie/MovieSlider";
import type { NextPage } from "next";
import { Divider, List, Typography, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Fragment } from "react";
import { getCategoryData, getDefaultMovie } from "../../api/category";
import MovieGrid from "../../components/Movie/MovieGrid";
import { getHomeData } from "../../api/movies";

interface CategoryProps {
  data: PopularMovie,
  newPage: boolean,
  dataCategory: Category[]
  // q: string;
  // data: {
  //   [id: string]: Item[];
  // };
  // main: Item;
}



const Category: NextPage<CategoryProps> = ({ data, dataCategory, newPage = false }) => {
  const category: {}[] = []
  const name = ["Phim", "TV Show"]

  Object.values(dataCategory).map((item: any, index) => {
    const test = { name: name[index], value: {} }
    const flag = item.map((item2: any) => {
      return {
        label: (<a href={`/category?genres=${item2.id}`}  >{item2.name}</a>),
        key: item2.id,
      }
    })
    test.value = flag

    category.push(test)
  })



  const menu2 = category.map((item: any) => {
    return <Menu
      items={
        item.value.map((item2: any) => {
          return item2
        })
      }
    />
  })







  return (
    <>
      <Meta
        title={newPage ? "Phim FPOLY" : ` - Phim FPOLY`}
        description={
          newPage ? "Xem những bộ phim yêu thích của bạn và chương trình TV trên website." : `Danh Mục `
        }
        image="/preview.png"
      />



      {/* <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      /> */}

      <div className="md:mx-20 pt-24 mx-10">

      </div>

      {newPage
        ? <div className="md:mx-20 pt-24 mx-10">
          <h1 className="text-2xl mb-8">
            Search result ({data.total_results}{" "}
            {data.total_results <= 1 ? "result" : "results"} found)
          </h1>


          <MovieGrid
            data={data.results}
            currentPage={data.page}
            maximumPage={data.total_pages}
            resolveLink={(page) =>
              `/category?page=${page}`
            }
          />


        </div>

        : <div className="md:mx-20 pt-24 mx-10">
          <h1 className="text-2xl mb-8">
            Search result ({data.total_results}{" "}
            {data.total_results <= 1 ? "result" : "results"} found)
          </h1>

          {category.map((item: any, index) => {
            return <Dropdown key={index + 1} overlay={menu2[index]} trigger={['click']}>
              <button onClick={(e) => e.preventDefault()} >
                <Space>
                  {item.name}
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          })}

          <MovieGrid
            data={data.results}
            currentPage={data.page}
            maximumPage={data.total_pages}
            resolveLink={(page) =>
              `/category?page=${page}`
            }
          />


        </div>
      }

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const q = query.q as string;
    const page = query.page ? Number(query.page) : 1;
    const data = await getDefaultMovie(page)
    const dataCategory = await getCategoryData()
    if (!query) {
      return {
        props: {
          newPage: true,
        },
      };
    }

    return {
      props: {
        data,
        dataCategory
        // q,
      },
      // revalidate: 1,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export default Category;
