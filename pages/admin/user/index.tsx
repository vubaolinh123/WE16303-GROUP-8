import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hook';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Image, Tag, Tooltip } from 'antd';
import { User } from '../../../models/user';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import { SearchOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import Link from 'next/link';
import { changeBreadcrumb, editRoleUser, editUser, getListUser } from '../../../features/user/user.slice';
import { LayoutProps } from '../../../models/layout';
import LayoutAdmin from '../../../components/Layout/admin';
import AdminPageHeader from '../../../components/Display/AdminPageHeader';

import style from "../../../styles/admin.module.scss"
import Meta from '../../../components/Shared/Meta';


interface DataType {
    key: React.Key;
    _id?: string,
    name: string,
    password?: string,
    email: string,
    image: string,
    birthday: string,
    age: number,
    role: number,
    status: number,
    createdAt?: string,
    updatedAt?: string
}


type DataIndex = keyof DataType;

type Props = {}

const AdminUser = (props: LayoutProps) => {
    const breadcrumb = useAppSelector(item => item.user.breadcrumb)
    const users = useAppSelector(item => item.user.value)
    const dispatch = useAppDispatch();
    console.log('users', users);
    console.log('breadcrumb', breadcrumb);
    const dateStr1 = "2022-08-03T07:07:16.117+00:00";
    const date1 = new Date(dateStr1);

    const timestamp = date1.getTime();
    console.log("timestamp", timestamp);
    console.log("time Unix", moment(timestamp));
    const timeTest = moment(dateStr1).toObject()
    console.log("timeTest", timeTest);

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selected, setSelected] = useState<{ key: number, id: string | undefined }[]>([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const dataTable = users.map((item: User, index) => {
        return {
            key: index + 1,
            _id: item._id,
            name: item.name,
            image: item.image,
            email: item.email,
            birthday: item.birthday,
            age: item.age,
            role: item.role,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
    })
    console.log("dataTable",dataTable);
    

    //------------------TABLE-DATA-------------------

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm Kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Xóa
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Lọc
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record: any) => {
            return record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
        }

    });

    //------------------SEARCH--------------------

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        let rowSelected: { key: number, id: string | undefined }[] = []
        newSelectedRowKeys.map((item) => {
            dataTable.map((item2) => item2.key === item ? rowSelected.push({ key: item2.key, id: item2._id }) : "")
        })
        console.log('rowSelected', rowSelected);
        console.log('newSelectedRowKeys', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys)
        setSelected(rowSelected);
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys: Key[] = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    onSelectChange(newSelectedRowKeys)
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys: Key[] = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    onSelectChange(newSelectedRowKeys)
                },
            },
        ],
    }
    //------------------SELECT-ROW-------------------

    const handleOk = (arr: any) => {
        const key = 'updatable';
        setConfirmLoading(true);
        message.loading({ content: 'Loading...', key });
        for (let i = 0; i < arr.length; i++) {
            arr[i].role = 1
        }
        setTimeout(() => {
            dispatch(editRoleUser(arr))
            setConfirmLoading(false);
            message.success({ content: 'Cấp Thành Công!', key, duration: 2 });
        }, 2000);
    };

    const handleOk2 = (arr: any) => {
        const key = 'updatable';
        setConfirmLoading(true);
        message.loading({ content: 'Loading...', key });
        for (let i = 0; i < arr.length; i++) {
            arr[i].role = 0
        }
        setTimeout(() => {
            dispatch(editRoleUser(arr))
            setConfirmLoading(false);
            message.success({ content: 'Xóa Quyền Thành Công!', key, duration: 2 });
        }, 2000);
    };

    const handleCancel = () => {
        message.error('Hủy Hành Động!');
    };


    //------------------REMOVE-CONFIRM-------------------

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: "key",
            width: 60,
            sorter: (a: any, b: any) => a.key - b.key,
            sortDirections: ['descend'],
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: "_id",
            ...getColumnSearchProps('_id'),
            sorter: (a: any, b: any) => a._id - b._id,
            sortDirections: ['descend'],
            ellipsis: {
                showTitle: false,
            },
            render: item => (
                <Tooltip placement="topLeft" title={item}>
                    {item}
                </Tooltip>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: "name",
            ...getColumnSearchProps('name'),

        },
        {
            title: 'Image',
            key: "image",
            render: (record) => (
                <div className="">
                    <Image
                        width={70}
                        height={70}
                        src={record.image}
                    />
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: "email",
            ...getColumnSearchProps('email'),
            ellipsis: {
                showTitle: false,
            },
            render: item => (
                <Tooltip placement="topLeft" title={item}>
                    {item}
                </Tooltip>
            ),

        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: "birthday",
            ...getColumnSearchProps('birthday'),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: "age",
            ...getColumnSearchProps('age'),
            sorter: (a: any, b: any) => a.age - b.age,
            sortDirections: ['descend'],
        },
        {
            title: 'Role',
            key: "role",
            sorter: (a: any, b: any) => a.role - b.role,
            sortDirections: ['descend'],
            render: (record) => (
                <div className="">
                    {record.role === 1
                        ? <Tag color="green">Admin</Tag>
                        : <Tag color="red">User</Tag>
                    }

                </div>
            )
        },
        {
            title: 'Status',
            key: "status",
            sorter: (a: any, b: any) => a.status - b.status,
            sortDirections: ['descend'],
            render: (record) => (
                <div className="">
                    {record.status === 1
                        ? <Tag color="green">Online</Tag>
                        : <Tag color="red">Offline</Tag>
                    }
                </div>
            )
        },

        {
            title: 'Ngày Tạo',
            dataIndex: 'createdAt',
            key: "createdAt",
            ellipsis: {
                showTitle: false,
            },
            render: item => (
                <Tooltip placement="topLeft" title={moment(item).format("MMM Do YYYY, h:mm:ss a")}>
                    {moment(item).format("MMM Do YYYY, h:mm:ss a")}
                </Tooltip>
            ),
        },
        {
            title: 'Ngày Update',
            dataIndex: 'updatedAt',
            key: "updatedAt",
            ellipsis: {
                showTitle: false,
            },
            render: item => (
                <Tooltip placement="topLeft" title={moment(item).format("MMM Do YYYY, h:mm:ss a")}>
                    {moment(item).format("MMM Do YYYY, h:mm:ss a")}
                </Tooltip>
            ),

        },
        {
            title: "Hành Động", key: "action", render: (text, record) => (
                record.role === 0
                    ? <Space align="center" size="middle">
                        <Button onClick={() => { dispatch(editRoleUser({ id: record._id, role: 1 })) }} style={{ background: "#198754" }} >
                            <span className="text-white"><UserAddOutlined /></span>
                        </Button>
                    </Space>
                    : <Space align="center" size="middle">
                        <Button onClick={() => { dispatch(editRoleUser({ id: record._id, role: 0 })) }} style={{ background: "#FF7875" }} >
                            <span className="text-white"><UserDeleteOutlined /></span>
                        </Button>
                    </Space>
            ),
        }
    ];

    //------------------TABLE-COLUMM-------------------

    useEffect(() => {
        dispatch(changeBreadcrumb("Quản Lý Users"))
        dispatch(getListUser())


    }, [])

    return (
        <div className={style.admin_text}>
            <Meta
                title={"AdminUser - Phim FPOLY"}
                description={
                    `AdminUser`
                }
                image="/preview.png"
            />
            <AdminPageHeader breadcrumb={"Quản Trị User"} />
            {selectedRowKeys.length > 1
                ? <div className="">
                    <Popconfirm
                        title="Bạn Có Muốn Cấp Quyền Hết?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => { handleOk(selected) }}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                    >
                        <Button className='mb-4' type="primary"  >
                            Cấp Quyền Admin
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Bạn Có Muốn Xóa Quyền Hết?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => { handleOk2(selected) }}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                    >
                        <Button className='ml-4' type="primary" danger >
                            Xóa Quyền Admin
                        </Button>
                    </Popconfirm>
                </div>


                : ""}

            <span style={{ marginLeft: 8 }}>
                {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} hàng` : ''}
            </span>

            <Table
                size="small"
                // className={`mt-4`}
                className="text"
                rowClassName={style.text}
                bordered
                footer={(record) => `Hiển thị ${record.length} trên tổng ${users.length}`}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataTable} />

        </div>
    )
}

AdminUser.Layout = LayoutAdmin

export default AdminUser