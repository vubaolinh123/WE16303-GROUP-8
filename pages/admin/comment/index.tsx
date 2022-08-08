import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Badge, Image, Tag } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import moment from 'moment'
import LayoutAdmin from '../../../components/Layout/admin';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import AdminPageHeader from '../../../components/Display/AdminPageHeader';
import { Detail } from '../../../models/type';
import { instance } from '../../../api/config';
import { detailMovie, getMovieDetails } from '../../../api/movies';
import Link from 'next/link';
import { getListComments } from '../../../features/comment/comment.slice';



interface DataType {
  key: React.Key;
  id: string,
  image: string,
  genres: { id: number, name: string }[],
  title: string,
  createdAt: string,
  status: string
}

interface ExpandedDataType {
  key: React.Key;
  _id?: string,
  user: string,
  movie: string,
  desc: string,
  status: number,
  createdAt?: string,
  updatedAt?: string
}


type DataIndex = keyof ExpandedDataType;


type Props = {}

const CommentList = (props: Props) => {

  const comments = useAppSelector(item => item.comment.value)
  const testComment = [
    { _id: "abc", user: "62e4e4777c18d30e6dbcd342", movie: 756999, desc: "abc123", status: 0, createdAt: "abc", updatedAt: "abc" },
    { _id: "abc1", user: "62e4e4777c18d30e6dbcd342", movie: 453395, desc: "abc123", status: 0, createdAt: "abc", updatedAt: "abc" },
  ]
  console.log("comments", comments);


  // const abc = async (a: any) => {
  //   const data = await detailMovie(a)
  //   console.log("data", data);
  //   // data.key = index + 1
  //   testMovie.push({
  //     key: data.id,
  //     id: data.id,
  //     image: data.backdrop_path,
  //     genres: data.genres,
  //     title: data.title,
  //     createdAt: data.release_date,
  //     status: data.status
  //   })
  // }

  const getID = async (id: string) => {
    // const data = await detailMovie(id)
    // console.log("data", data);
    return await detailMovie(id)
  }

  const fetchData = async (id: string) => {
    return await detailMovie(id).then(res => res);
  }

  // const data = fetchData(giphy_url);
  // console.log(`Data: ${data}`);

  const testMovie: DataType[] = []
  const dataTable = comments.map(async (item: any, index) => {

    // abc(item.movie)
    // return item
    if (item.type === "movie") {
      const abc = await detailMovie(item.movie_id)
      console.log("abc", abc);
      // testMovie.push(abc)
      [...testMovie,abc]

      const data = fetchData(item.movie_id);
      console.log(`Data: ${data}`);

      return abc
      // return {
      //   key: index + 1,
      //   id: data.id,
      //   image: data.backdrop_path,
      //   genres: data.genres,
      //   title: data.title,
      //   createdAt: data.release_date,
      //   status: data.status
      // }

    }

  })
  console.log("testMovie", testMovie);
  console.log("dataTable", dataTable);

  const dispatch = useAppDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: string, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);


  //------------------STATE--------------------



  // const dataTable = testMovie.map((item: any, index) => {
  //   console.log("item dbtable", item);

  //   return {
  //     key: index + 1,
  //     id: item.id,
  //     image: item.image,
  //     genres: item.genres,
  //     title: item.title,
  //     createdAt: item.createdAt,
  //     status: item.status
  //   }

  // })
  console.log('dataTable', dataTable);

  const childrenTable = comments.map((item: any, index) => {
    return {
      key: item._id,
      _id: item._id,
      user: item.user,
      movie: item.movie,
      desc: item.desc,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt

    }
  })
  console.log('childrenTable', childrenTable);


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
    let rowSelected: { key: string, id: string | undefined }[] = []
    newSelectedRowKeys.map((item) => {
      childrenTable.map((item2) => item2.key === item ? rowSelected.push({ key: item2.key, id: item2._id }) : "")
    })
    console.log('rowSelected', rowSelected);
    console.log('newSelectedRowKeys', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys)
    setSelected(rowSelected);
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
  };

  const rowSelection: TableRowSelection<ExpandedDataType> = {
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
  // ------------------SELECT-ROW-------------------

  // const handleOk = (id) => {
  //   const key = 'updatable';
  //   setConfirmLoading(true);
  //   console.log(id);
  //   message.loading({ content: 'Loading...', key });

  //   setTimeout(() => {
  //     if (Array.isArray(id)) {
  //       dispatch(removeAnswerQuizSlide(id))
  //     } else {
  //       dispatch(removeAnswerQuizSlide(id))
  //     }
  //     setConfirmLoading(false);
  //     message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  //   }, 2000);
  // };

  const handleCancel = () => {
    message.error('Hủy Hành Động!');
  };


  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: "id",
      // ...getColumnSearchProps('id'),
      sorter: (a: any, b: any) => a._id - b._id,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],

    },

    {
      title: 'Image',
      key: "image",
      render: (record) => (
        <div className="">
          <Image
            width={100}
            height={100}
            src={record.image}
          />
        </div>
      )
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: "title",
      // ...getColumnSearchProps('title'),
    },
    {
      title: 'genres',
      key: "genres",
      render: (record) => (
        <div className="">
          {record.genres.map((item: any) => {
            return <span>{item}</span>
          })}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: "status",
      // ...getColumnSearchProps('title'),
    },

    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: "createdAt",

    }

  ];

  // const expandedRowRender = (row: any) => {

  //   console.log("expandedRow", row);

  //   const columns2: ColumnsType<ExpandedDataType> = [
  //     { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden" },
  //     { title: 'STT', dataIndex: 'stt', key: 'stt' },
  //     { title: 'ID', dataIndex: '_id', key: '_id' },

  //     { title: 'Answer', dataIndex: 'answer', key: 'answer' },
  //     {
  //       title: 'IsCorrect',

  //       key: 'isCorrect',
  //       render: (record) => (
  //         <span>
  //           {record.isCorrect === 1
  //             ? <Badge status="success" text={<CheckCircleOutlined />} />
  //             : <Badge status="error" text={<CloseCircleOutlined />} />
  //           }
  //         </span>
  //       ),
  //     },
  //     {
  //       title: "Hành Động", key: "action", render: (text, record) => (
  //         <Space align="center" size="middle">
  //           <Button style={{ background: "#198754" }} >
  //             <Link href={`/admin/answerQuiz/${record._id}/edit`} >
  //               <span className="text-white">Sửa</span>
  //             </Link>

  //           </Button>

  //           <Popconfirm
  //             placement="topRight"
  //             title="Bạn Có Muốn Xóa?"
  //             okText="Có"
  //             cancelText="Không"
  //             // onConfirm={() => { handleOk(record._id) }}
  //             okButtonProps={{ loading: confirmLoading }}
  //             onCancel={handleCancel}
  //           >
  //             <Button type="primary" danger >
  //               Xóa
  //             </Button>
  //           </Popconfirm>

  //         </Space>
  //       ),
  //     }
  //   ];


  //   // let data: any = answerQuizs.map((item: AnswerQuizType, index) => item.quiz === row._id ? {
  //   //   key: index + 1,
  //   //   _id: item._id,
  //   //   answer: item.answer,
  //   //   quiz: item.quiz,
  //   //   isCorrect: item.isCorrect
  //   // } : null)

  //   let data: any = testComment.filter((item: any) => item.movie === row._id).map((item2: any, index) => {
  //     return {
  //       // key: item2._id,
  //       // stt: index + 1,
  //       // _id: item2._id,
  //       // answer: item2.answer,
  //       // quiz: item2.quiz,
  //       // isCorrect: item2.isCorrect
  //       key: item2._id,
  //       stt: index + 1,
  //       _id: item2._id,
  //       user: item2.user,
  //       movie: item2.movie,
  //       desc: item2.desc,
  //       status: item2.status,
  //     }
  //   })



  //   // console.log("data Children", data);

  //   return <Table rowSelection={rowSelection} columns={columns2} dataSource={data} pagination={false} />
  // }
  //------------------TABLE-COLUMM-------------------





  useEffect(() => {
    dispatch(getListComments())
  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={"Quản trị Comment"} />


      {/* {selectedRowKeys.length > 1
        ? <Popconfirm
          title="Bạn Có Muốn Xóa Hết?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => { handleOk(selected) }}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button className='ml-4' type="primary" danger >
            Xóa Hết
          </Button>
        </Popconfirm>
        : ""} */}

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} hàng` : ''}
      </span>



      <Table
        bordered

        footer={() => `Hiển thị 10 trên tổng`}
        // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}

        columns={columns}
        dataSource={testMovie}

      />

    </div>
  )
}

CommentList.Layout = LayoutAdmin

export default CommentList