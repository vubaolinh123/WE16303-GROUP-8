import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";
import { GetServerSideProps, GetStaticProps } from "next";
import { Category, Item, PopularMovie } from "../../../models/type";
import Meta from "../../../components/Shared/Meta";
import type { NextPage } from "next";
import { Divider, List, Typography, Dropdown, Menu, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { getCategoryData, getDefaultMovie, getMovieByCategory, sortMovie } from "../../../api/category";
import MovieGrid from "../../../components/Movie/MovieGrid";
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface CategoryProps {
  data: PopularMovie,
  dataCategory: Category[],
  response: PopularMovie,
  q: string
  // data: {
  //   [id: string]: Item[];
  // };
  // main: Item;
}



const MovieCategory: NextPage<CategoryProps> = ({ data, dataCategory, q, response }) => {
  const router = useRouter()
  console.log("router query", router.query);
  console.log("query", q);
  console.log("response", response);
  // console.log("responseSort", responseSort);
  const [dataSort, setDataSort] = useState<PopularMovie>()

  console.log('dataSort', dataSort);
  const [urlSort, setUrlSort] = useState<any>()
  const test2: any[] = []
  const sortLanguage = [{ name: "Korea", value: "ko" }, { name: "America", value: "en" }, { name: "Japan", value: "ja" }, { name: "Vietnam", value: "vi" }]
  const sortYear = [{ name: "2022", value: 2022 }, { name: "2021", value: 2021 }, { name: "2020", value: 2020 }, { name: "2019", value: 2019 }, { name: "2018", value: 2018 }, { name: "Trước Đó", value: 2017 }]
  const sortBy = [
    { name: `Độ Phổ Biến `, icon: <UpOutlined />, value: "popularity.desc" },
    { name: "Ngày Ra Mắt ", icon: <UpOutlined />, value: "release_date.desc" },
    { name: "Ngày Ra Mắt", icon: <DownOutlined />, value: "release_date.asc" },
    { name: "Lượt Đánh Giá", icon: <UpOutlined />, value: "vote_average.desc" },

  ]

  const category: any[] = []
  const name = [
    { name: "Phim", value: "movie" },
    { name: "TV Show", value: "tv" }
  ]
  console.log("name",name);
  

  const { Option } = Select;

  console.log("dataCategory", dataCategory);
  console.log("response", response);
  console.log("data", data);

  Object.values(dataCategory).map((item: any, index) => {
    // console.log("item", item);

    const test = { name: name[index].name, value: {} }
    const test3: any = { name: name[index].value, value: [] }
    const flag = item.map((item2: any) => {
      test3.value.push(item2)
      return {
        label: (<a href={`/category/${name[index].value}?genres=${item2.id}`}  >{item2.name}</a>),
        key: item2.id,
      }
    })
    test.value = flag
    console.log("test", test);
    test2.push(test3)
    category.push(test)
  })
  console.log("category", category);
  console.log("test2", test2);


  const menu2: any = category.map((item: any) => {
    return <Menu
      items={
        item.value.map((item2: any) => {
          // console.log("item 2", item2);
          return item2
        })
      }
    />
  })
  console.log("menu2", menu2);

  const onFinish = async (values: any) => {
    const flag: any = {}
    flag.type = values.type ? values.type : "";
    flag.genres = values.genres ? values.genres : "";
    flag.page = router.query.page ? Number(router.query.page) : 1;
    flag.language = values.language ? values.language : "";
    flag.year = values.year ? values.year : 0;
    flag.sort = values.sort ? values.sort : "popularity.desc";
    flag.theatres = router.query.theatres ? router.query.theatres : false;

    if (values.type && values.genres) {
      router.push({
        pathname: `/category/${values.type}`,
        query: { genres: flag.genres, page: flag.page, sort_by: flag.sort, year: flag.year, theatres: flag.theatres },
      })
    }

    const response = await sortMovie(flag.page, q, flag.language, flag.year, flag.sort, flag.theatres)
    console.log('response submit', response);
    setDataSort(response)
    console.log('dataSort sort', dataSort);
    setUrlSort(flag)
    console.log('flag:', flag);
    console.log('Success:', values);
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form!.resetFields();
  };


  // --------------------------------------------------

  const [selectedCompanyId, setSelectedCompanyId] = useState(undefined);
  const [form] = Form.useForm();
  const handleFormValuesChange = (changedValues: any) => {
    const formFieldName = Object.keys(changedValues)[0];
    console.log("formFieldName", formFieldName);
    console.log("changedValues", changedValues);

    if (formFieldName === "type") {
      setSelectedCompanyId(changedValues[formFieldName]);
      form.setFieldsValue({ genres: undefined }); //reset genres selection
    }
  };


  console.log('dataSort', dataSort);

  // console.log('responseSort submit 2', responseSort);

  useEffect(() => {
    setDataSort(response)
    console.log('response useEffect', dataSort);
    // if(Array.isArray(responseSort.results)){
    //   setDataSort(responseSort)
    //   console.log('responseSort useEffect', dataSort);
    // }
    // if(Array.isArray(response.results)){
    //   setDataSort(response)
    //   console.log('response useEffect', dataSort);
    // }
  }, [response])


  return (
    <>
      <Meta
        title={q ? "Movie - Phim FPOLY" : `Movie - Phim FPOLY`}
        description={
          q ? "Xem những bộ phim yêu thích của bạn và chương trình TV trên website." : `Danh Mục `
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
        <Form
          layout="inline"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          onValuesChange={handleFormValuesChange}
        >
          {/* <Form.Item
            label=""
            name="genres"
          >
            <Select defaultValue="Tất cả" style={{ width: 120 }} >
              {category.map((item: any, index: any) => {
                return <Option key={index + 1} value={item.name}>{item.name}</Option>

              })}

            </Select>
          </Form.Item> */}

          <Form.Item name="type">
            <Select placeholder="Thể Loại" style={{ width: 200 }}>
              {name.map((item: any, index) => (
                <Option key={index} value={item.value}>
                  <span className="!text-black">{item.name}</span>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="genres" >
            <Select placeholder="Danh Mục" disabled={selectedCompanyId ? false : true} style={{ width: 200 }} >
              {test2.map((item: any) => {
                if (item.name === selectedCompanyId) {
                  return item.value.map((item2: any, index: any) => {
                    return <Option key={index} value={item2.id}>
                      <span className="!text-black">{item2.name}</span>
                    </Option>
                  })
                }
              })}

            </Select>
          </Form.Item>

          <Form.Item name="language" >
            <Select placeholder="Quốc Gia" style={{ width: 120 }}  >
              {sortLanguage.map((item: any, index) => {
                return <Option key={index} value={item.value}>
                  <span className="!text-black">{item.name}</span>
                </Option>
              })}

            </Select>
          </Form.Item>

          <Form.Item name="year" className="text-black" >
            <Select placeholder="Tất Cả" style={{ width: 200 }} >
              {sortYear.map((item: any, index) => {
                return <Option key={index} value={item.value}>
                  <span className="!text-black">{item.name}</span>
                </Option>
              })}

            </Select>
          </Form.Item>

          <Form.Item name="sort" >
            <Select  placeholder="Sắp Xếp" style={{ width: 200 }}  >
              {sortBy.map((item: any, index) => {
                return <Option  key={index} value={item.value}>
                  <span className="!text-black">{item.name}</span>
                  <span className="text-sm text-red-500  ">{item.icon}</span>
                </Option>
              })}

            </Select>
          </Form.Item>







          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lọc
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button danger type="primary" htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>

        </Form>
      </div>

      {q || dataSort
        ? <div className="md:mx-20 pt-24 mx-10">
          {/* <h1 className="text-2xl mb-8">
            Có ({dataSort ? dataSort.total_results : response.total_results}{" "}
            {dataSort ? dataSort.total_results : response.total_results <= 1 ? "result" : "results"} Kết Quả)
          </h1> */}



          <MovieGrid
            data={dataSort ? dataSort.results : response.results}
            currentPage={dataSort ? dataSort.page : response.page}
            maximumPage={dataSort ? dataSort.total_pages : response.total_pages}
            resolveLink={(page) =>
              dataSort
                ? `/category/movie?genres=${q}&page=${page}&sort_by=${urlSort ? urlSort?.sort : router.query.sort_by}&year=${urlSort ? urlSort?.year : router.query.year}&language=${urlSort ? urlSort?.language : router.query.language}`
                : `/category/movie?genres=${q}&page=${page}`
            }
          />


        </div>

        : <div className="md:mx-20 pt-24 mx-10">
          {/* <h1 className="text-2xl mb-8">
            Có ({data.total_results}{" "}
            {data.total_results <= 1 ? "result" : "results"} Kết quả)
          </h1> */}

          {/* {category.map((item: any, index) => {
            return <Dropdown key={index + 1} overlay={menu2[index]} trigger={['click']}>
              <button onClick={(e) => e.preventDefault()} >
                <Space>
                  {item.name}
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
          })} */}

          <MovieGrid
            data={data.results}
            currentPage={data.page}
            maximumPage={data.total_pages}
            resolveLink={(page) =>
              `/category/movie?page=${page}`
            }
          />


        </div>
      }

    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const q = query.genres as string;
    const page = query.page ? Number(query.page) : 1;
    const year: any = query.year ? Number(query.year) : 0
    const sort = query.sort_by ? query.sort_by as string : "popularity.desc"
    const language = query.language ? query.language as string : ""
    const theatres = query.theatres ? true : false
    const data = await getDefaultMovie(page)
    const dataCategory = await getCategoryData()

    // const responseSort = await sortMovie(page, q, language, year, sort)
    // const response = await getMovieByCategory(page, q)

    if (query.year && query.sort_by) {
      console.log("Case 1 page", page);
      const response = await sortMovie(page, q, language, year, sort, theatres)
     
      console.log("Case 1");

      return {
        props: {
          data,
          dataCategory,
          // responseSort,
          response,
          q
        },
        
        
      };
    }

    if (q) {
      const response = await getMovieByCategory(page, q)
      console.log("Case 2");
      return {
        props: {
          data,
          dataCategory,
          response,
          q
        },
        
      };
    }

    return {
      props: {
        data,
        dataCategory
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
      revalidate: true,
    };
  }
};

export default MovieCategory;
