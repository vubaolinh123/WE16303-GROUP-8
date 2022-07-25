import React, { useEffect, useState } from 'react'
import { LayoutProps } from '../../models/layout'
import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { UserOutlined, CommentOutlined, DollarOutlined, LaptopOutlined, FolderFilled, BellOutlined, ReadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import logo from '../../public/img/Netflix-logo.png'
import Image from 'next/image';
import { useRouter } from 'next/router';

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
        <Layout style={{ width: "100%", minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="flex justify-center py-2 logo" >
                    <Link aria-current="page" className="logo active" href={"/"}>
                        {collapsed
                            ? <svg style={{ width: collapsed ? 50 : 115, height: 30 }} >
                                <g style={{ fill: "#e50914" }} >
                                    <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z">
                                    </path>
                                </g>
                            </svg>
                            : <svg style={{ width: collapsed ? 30 : 115, height: 30 }} >
                                <g style={{ fill: "#e50914" }} >
                                    <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z">
                                    </path>
                                </g>
                            </svg>}
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

                    <SubMenu key="sub2" icon={<FolderFilled />} title="Category">
                        <Menu.Item key="/admin/category">
                            <Link href={'/admin/category'}>List Category</Link>
                        </Menu.Item>
                        <Menu.Item key="/admin/category/form">
                            <Link href={'/admin/category/form'}>Add Category</Link>
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
    )
}



export default LayoutAdmin