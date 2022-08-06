import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import type { NextPage } from "next";
import { getCategoryData } from "../../api/category";
import { useEffect, useState } from "react";
import { store } from '../../app/store';
import { Dropdown, Menu, Space, Avatar } from "antd";
import { DownOutlined, UpOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const Navbar: NextPage = () => {


    const [dataCategory, SetDataCategory] = useState<{}[]>([])
    // const isLoggedIn = store.getState().auth.isLoggedIn
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn)

    const name = [
        { name: "Phim", value: "movie" },
        { name: "TV Show", value: "tv" }
    ]
    const category: any[] = []

    Object.values(dataCategory).map((item: any, index) => {

        const test = { name: name[index].name, value: {} }

        const flag = item.map((item2: any) => {

            return {
                label: (<a className="!text-black !hover:text-red-500" href={`/category/${name[index].value}?genres=${item2.id}`}  >{item2.name}</a>),
                key: item2.id,
            }
        })
        test.value = flag
        category.push(test)
    })

    const menu2: any = category.map((item: any) => {
        return <Menu
            items={
                item.value.map((item2: any) => {
                    return item2
                })
            }
        />
    })

    useEffect(() => {
        const getCategory = async () => {
            const dataCategory = await getCategoryData()
            SetDataCategory(dataCategory)
        }
        getCategory()
    }, [])

    return (
        <div
            style={{ minHeight: "60px" }}
            className="fixed bg-[#20202380] backdrop-blur-sm top-0 left-0 right-0 w-screen py-3 md:px-7 px-3 h-[7vw] max-h-16 z-50 flex justify-between items-center transition duration-500  navbar"
        >
            <div className=" top-0 left-0 right-0 w-screen py-3 md:px-7 px-3 h-[7vw] max-h-16 z-50 flex justify-start  items-center transition duration-500 bg-transparent navbar">
                <Link href="/">
                    <a className="h-full w-auto">
                        <img className="h-full w-auto" src="/logo.png" alt="" />
                    </a>
                </Link>
                {/* {dataCategory?.map((item: any, index) => {
                    return <Link href={item.value}>
                        <a className="h-full w-auto px-4 pt-3">
                            Danh Mục
                        </a>
                    </Link>
                })} */}
                {category.map((item: any, index) => {
                    return <Dropdown className="h-full w-auto px-4 pt-2 " trigger={['hover']} key={index + 1} overlay={menu2[index]}>

                        <Space>

                            <a href={`/category/${name[index].value}`} className="hover:text-red-600 cursor-pointer text-white">{item.name}</a>
                        </Space>


                    </Dropdown>
                })}
                <Link href={`/category/movie?theatres=true`}>

                    <span className="h-full w-auto px-4 pt-[13px] cursor-pointer text-white hover:text-red-600 ">
                        Phim Chiếu Rạp
                    </span>
                </Link>
                {isLoggedIn &&
                    <Link href={`/account/my-list`}>
                        <span className="h-full w-auto px-4 pt-[13px] cursor-pointer text-white hover:text-red-600 ">
                            Danh sách của tôi
                        </span>
                    </Link>
                }
            </div>
            <Link href="/search">
                <a>
                    <FaSearch className="mr-4 cursor-pointer" size={25} />
                </a>
            </Link>
            <div className="px-4">
                {isLoggedIn &&
                    <Link href={'/account'}>
                        <Avatar size="large" className="cursor-pointer" icon={<UserOutlined />} />
                    </Link>
                }
                {isLoggedIn === false &&
                    <Link href={'/login'}>
                        <button className="hover:text-red-700 w-[70px]">Đăng nhập</button>
                    </Link>
                }
            </div>
        </div >
    );
};

export default Navbar;
