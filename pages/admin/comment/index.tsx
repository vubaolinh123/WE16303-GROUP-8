import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Badge, Image, Tag, Tooltip } from 'antd';
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
import { detailMovie, detailTVShow, getMovieDetails } from '../../../api/movies';
import Link from 'next/link';
import { getListComments, removeComment } from '../../../features/comment/comment.slice';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { listComments } from '../../../api/comment';
import { Comment } from '../../../models/comment';
import { imageResize } from '../../../api/constants';
import style from "../../../styles/admin.module.scss"
import Meta from '../../../components/Shared/Meta';
import { getListUser } from '../../../features/user/user.slice';



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
  _id?: number,
  userId: string,
  movie_id: string,
  desc: string,
  status: number,
  createdAt?: string,
  updatedAt?: string
}


type DataIndex = keyof ExpandedDataType;
type DataIndex2 = keyof DataType;

interface CommentListProps {
  response: any,
  data: any,
  q: string

}
const CommentList = ({ response, data }: CommentListProps) => {
  console.log("response", response);
  console.log("data", data);




  


  const comments = useAppSelector(item => item.comment.value)
  const users = useAppSelector(item => item.user.value)
  console.log("comments", comments);
  console.log("users", users);
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: string, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);


  //------------------STATE--------------------

  const childrenTable = comments.map((item: any, index) => {
    return {
      key: item._id,
      _id: item._id,
      userId: item.user,
      movie_id: item.movie,
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

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
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

  const getColumnSearchProps2 = (dataIndex: DataIndex): ColumnType<ExpandedDataType> => ({
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

  const handleOk = (id: any) => {
    const key = 'updatable';
    setConfirmLoading(true);
    console.log(id);
    message.loading({ content: 'Loading...', key });

    setTimeout(() => {
      if (Array.isArray(id)) {
        dispatch(removeComment(id))
      } else {
        dispatch(removeComment(id))
      }
      setConfirmLoading(false);
      setSelected([])
      message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
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
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: "id",
      ...getColumnSearchProps('id'),

    },

    {
      title: 'Image',
      key: "image",
      render: (record) => (
        <div className="">
          <Image
            width={100}
            height={100}
            src={imageResize(record.image)}
          />
        </div>
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: "title",
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Genres',
      key: "genres",
      ...getColumnSearchProps('genres'),
      render: (record) => (
        <div className="">
          {record.genres.map((item: any) => {
            return <Tag color="red">{item.name}</Tag>
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
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: "createdAt",

    }

  ];

  const expandedRowRender = (row: any) => {

    console.log("expandedRow", row);

    const columns2: ColumnsType<ExpandedDataType> = [
      { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden", width: "8%" },
      { title: 'STT', dataIndex: 'stt', key: 'stt',sorter: (a: any, b: any) => a.stt - b.stt },
      {
        title: 'ID',
        dataIndex: '_id',
        key: "_id",
        ...getColumnSearchProps2('_id'),
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
        title: 'User',
        key: 'userId',
        ellipsis: {
          showTitle: false,
        },
        render: (record) => (
          <div className="">
            {users.map((item: any, index) => {
              if (item._id === record.userId) {
                return <div className="flex justify-start gap-1 ">
                  <div className="basis-1/4">
                    <Image
                      width={50}
                      height={50}
                      src={item.image}
                    />
                  </div>

                  <Tooltip placement="topLeft" title={item.name}>
                    <span className='mt-4 basis-3/4 text-start '>{item.name}</span>
                  </Tooltip>
                </div>
              }
            })}
          </div>
        ),
      },
      {
        title: 'Desc', key: 'desc', render: (record) => {
          return <Tooltip placement="topLeft" title={record.desc}>
            {record.desc}
          </Tooltip>
        }
      },
      {
        title: "Hành Động", key: "action", render: (text, record) => (
          <Space align="center" size="middle">
            <Popconfirm
              placement="topRight"
              title="Bạn Có Muốn Xóa?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => { handleOk(record._id) }}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button type="primary" danger >
                Xóa
              </Button>
            </Popconfirm>

          </Space>
        ),
      }
    ];


    // let data: any = answerQuizs.map((item: AnswerQuizType, index) => item.quiz === row._id ? {
    //   key: index + 1,
    //   _id: item._id,
    //   answer: item.answer,
    //   quiz: item.quiz,
    //   isCorrect: item.isCorrect
    // } : null)

    let data: any = comments.filter((item: any) => item.movie_id === row.id).map((item2: any, index) => {
      return {
        // key: item2._id,
        // stt: index + 1,
        // _id: item2._id,
        // answer: item2.answer,
        // quiz: item2.quiz,
        // isCorrect: item2.isCorrect
        key: item2._id,
        stt: index + 1,
        _id: item2._id,
        userId: item2.userId,
        movie_id: item2.movie_id,
        desc: item2.desc,
        status: item2.status,
      }
    })



    // console.log("data Children", data);

    return <Table rowSelection={rowSelection} columns={columns2} dataSource={data} pagination={false} />
  }
  //------------------TABLE-COLUMM-------------------





  useEffect(() => {
    dispatch(getListComments())
    dispatch(getListUser())
  }, [])

  return (
    <div className={style.admin_text}>
      <AdminPageHeader breadcrumb={"Quản trị Comment"} />


      {selectedRowKeys.length > 1
        ? <Popconfirm
          className={`!text-black`}
          title="Bạn Có Muốn Xóa Hết?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => { handleOk(selected) }}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button className='mb-4' type="primary" danger >
            Xóa Hết
          </Button>
        </Popconfirm>
        : ""}

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} hàng` : ''}
      </span>



      <Table
        bordered

        footer={() => `Hiển thị 10 trên tổng`}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}

        columns={columns}
        dataSource={response}

      />

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    context.res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate")
    const { data } = await listComments()



    // const dataSort = data.map((item: any, index) => {
    //   // const check = data.includes(item.movie_id)
    //   // console.log("check",check);

    //   if (data) {
    //     return item
    //   }
    // })
    // console.log("dataSort", dataSort);

    const result: any = await Promise.all(data.map(async (item: any, index: any) => {
      if (item.type === "movie") {
        const abc = await detailMovie(item.movie_id)
        return {
          key: index + 1,
          id: abc.id,
          image: abc.poster_path,
          genres: abc.genres,
          title: abc.title,
          createdAt: abc.release_date,
          status: abc.status
        }

      } else {
        const abc = await detailTVShow(item.movie_id)
        return {
          key: index + 1,
          id: abc.id,
          image: abc.poster_path,
          genres: abc.genres,
          title: abc.name,
          createdAt: abc.first_air_date,
          status: abc.status
        }
      }

    }))
    // console.log("response", response);
    const response = Object.values(result.reduce((r: any, o: any) => {
      if (r[o.id]) r[o.id].count++;
      else r[o.id] = { ...o, sort: 1, count: 1 };
      return r;
    }, {}));
    response.sort((a: any, b: any) => (a.key > b.key ? 1 : -1))


    return {
      props: {
        response,
        data
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

CommentList.Layout = LayoutAdmin


export default CommentList