import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import type { NextPage } from "next";
import { getCategoryData } from "../../api/category";
import { useEffect, useState } from "react";
import { Dropdown, Menu, Space, Avatar } from "antd";
import { DownOutlined, UpOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const Navbar: NextPage = () => {

    
    const [dataCategory, SetDataCategory] = useState<{}[]>([])
    const name = [
        { name: "Phim", value: "movie" },
        { name: "TV Show", value: "tv" }
    ]
    const category: any[] = []
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    icon: <BellOutlined />,
                    label: (
                        <span>
                            Profile
                        </span>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <span>
                            Log Out
                        </span>
                    ),
                    icon: <BellOutlined />,
                    danger: true,


                }
            ]}
        />
    );

    console.log("dataCategory", dataCategory);

    Object.values(dataCategory).map((item: any, index) => {
        // console.log("item", item);

        const test = { name: name[index].name, value: {} }

        const flag = item.map((item2: any) => {

            return {
                label: (<a className="!text-black !hover:text-red-500" href={`/category/${name[index].value}?genres=${item2.id}`}  >{item2.name}</a>),
                key: item2.id,
            }
        })
        test.value = flag
        console.log("test", test);
        category.push(test)
    })
    console.log("category", category);

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
            </div>
            <Link href="/search">
                <a>
                    <FaSearch className="mr-4 cursor-pointer" size={25} />
                </a>
            </Link>
            <div className="px-4">

                <Dropdown overlay={menu} className="cursor-pointer" trigger={['hover']}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </div >
    );
};

export default Navbar;
