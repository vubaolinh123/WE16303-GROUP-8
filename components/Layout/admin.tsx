import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../models/layout'
import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { UserOutlined, CommentOutlined, DollarOutlined, LaptopOutlined, FolderFilled, BellOutlined, ReadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import logo from '../../public/img/Netflix-logo.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PrivateRoute from '../PrivateRouter/index';

const LayoutAdmin = ({ children }: LayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { Header, Content, Footer, Sider } = Layout;

    const router = useRouter()
    const [current, setCurrent] = useState(router.pathname)
    // const style = {
    //     marginRight: 10,
    //     color: router.asPath === href ? 'red' : 'black',
    // }

    // const handleClick = (e) => {
    //     e.preventDefault()
    //     router.push(href)
    // }

    function handleClick(e: any) {
        setCurrent(e.key);
    }

    const notification = (
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





    useEffect(() => {
        if (router) {
            if (current !== router.pathname) {
                setCurrent(router.pathname);
            }
        }
    }, [router, current])



    return (
        <PrivateRoute>
            
        <div className="">
            <Head>
                <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
            </Head>
            <Layout style={{ width: "100%", minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="logo flex justify-center py-2" >
                        <Link aria-current="page" className="logo active" href={"/"}>

                            {collapsed
                                ? <img src="/logo.png" alt="" className="h-7  px-2 my-2" />
                                : <img src="/logo.png" alt="" className="h-11 w-40" />
                            }
                        </Link>
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onClick={handleClick}
                        selectedKeys={[current]}
                    >
                        <Menu.Item key="/admin" icon={<FolderFilled />}>
                            <Link href={'/admin'} >Dashbroad</Link>
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<FolderFilled />} title="User">
                            <Menu.Item key="/admin/user">
                                <Link href={'/admin/user'}>User List</Link>
                            </Menu.Item>
                            
                        </SubMenu>

                        <SubMenu key="sub3" icon={<FolderFilled />} title="Comment">
                            <Menu.Item key="/admin/comment">
                                <Link href={'/admin/comment'}>Movie Comment</Link>
                            </Menu.Item>
                            
                        </SubMenu>


                    </Menu>
                </Sider>



                <Layout className="site-layout" >
                    <Header className="site-layout-background" style={{ padding: 0 }} >

                        <div className="flex justify-end">
                            <div className="px-4">
                                <Dropdown overlay={notification} trigger={['click']} placement="bottomRight">
                                    <Badge dot>
                                        <BellOutlined style={{ fontSize: 24, color: 'white' }} />
                                    </Badge>
                                </Dropdown>
                            </div>
                            <div className="px-4">

                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                </Dropdown>
                            </div>
                        </div>

                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '16px',
                            minHeight: 280,
                            background: "#fff"
                        }}
                    >
                        <aside style={{ padding: 24 }} >{children}</aside>
                    </Content>
                </Layout>


            </Layout>
        </div>
        </PrivateRoute>
    )
}



export default LayoutAdmin