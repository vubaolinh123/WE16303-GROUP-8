import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import AdminPageHeader from '../../components/Display/AdminPageHeader'
import LayoutAdmin from '../../components/Layout/admin'
import { changeBreadcrumb, getListUser } from '../../features/user/user.slice'
import { LayoutProps } from '../../models/layout'

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment'
import { Col, Row, Card } from 'antd'
import CountUp from 'react-countup'
import { UserOutlined, CommentOutlined, VideoCameraOutlined, VideoCameraAddOutlined, DollarOutlined, LaptopOutlined, FolderFilled, BellOutlined, ReadOutlined } from '@ant-design/icons';
import styles from "../../styles/admin.module.scss"
import Meta from '../../components/Shared/Meta'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'


type AdminDashbroadProps = {
  Layout: any,
  arrTime: any,
  users: any
}

const AdminDashbroad = ({  }) => {
  const users = useAppSelector(item => item.user.value)
    const dispatch = useAppDispatch();
    console.log('users', users);
    // const dateStr1 = "2022-08-03T07:07:16.117+00:00";
    // const date1 = new Date(dateStr1);
    // const timestamp = date1.getTime();
    // console.log("timestamp", timestamp);
    // console.log("time Unix", moment(timestamp));
    // const timeTest = moment(dateStr1).toObject()
    // console.log("timeTest", timeTest);
    // console.log("day in month", moment(dateStr1, "YYYY-M").daysInMonth());

    const arrTime: any = [{ time: 6, quantity: 0 }]
    console.log("final", moment().subtract(1, 'days'));
    const usersTime = users.forEach((item: any) => {
      const time = moment(item.createdAt).toObject()
      const existingItem = arrTime.find((item: any) => item.time - 1 === time.months);
      if (!existingItem) {
        arrTime.push({
          time: time.months + 1,
          quantity: 1
        });

      } else {
        existingItem.quantity++;
      }

    })
    console.log("arrTime", arrTime);

    useEffect(()=>{
      dispatch(changeBreadcrumb("Quản Lý Users"))
      dispatch(getListUser())
    },[])



  // const dataTime = [
  //   {timeTest.}
  // ]

  // const setHoverData = (e) => {
  //   // The chart is not updated because `chartOptions` has not changed.
  //   setState({ hoverData: e.target.category })
  // }

  // const { chartOptions, hoverData } = this.state;
  const [state, setState] = useState()
  const test = {
    chartOptions: {

      title: {
        text: 'Số Lượng User '
      },
      xAxis: {
        // [`${moment().subtract(3,"M").format("M/YYYY")}`, `${moment().subtract(2, 'M').format("M/YYYY")}`, `${moment().subtract(1, 'M').format("M/YYYY")}`, `${moment().format("M/YYYY")}`, `${moment().add(1, 'M').format("M/YYYY")}`, `${moment().add(2, 'M').format("M/YYYY")}`,]
        categories: arrTime.map((item: any) => {
          return item.time

        }),
      },
      series: [
        {
          data: arrTime.map((item: any) => {
            return item.quantity
          })
        }
      ],
      plotOptions: {
        series: {
          point: {
            events: {
              // mouseOver: setHoverData.bind(this)
            }
          }
        },

      }
    },
    hoverData: null
  };
  const { chartOptions, hoverData } = test;




  return (
    <div className={styles.admin_text}>
      <Meta
        title={"AdminDashbroad - Phim FPOLY"}
        description={
          `AdminDashbroad`
        }
        image="/preview.png"
      />

      <Row gutter={24}>
        <Col key={1} lg={6} md={12}>
          <Card
            className={styles.numberCard}
            bordered={false}
            bodyStyle={{ padding: 10 }}

          >
            <span className={styles.iconWarp} >
              <VideoCameraOutlined />
            </span>
            <div className={styles.content}>
              <p className={styles.title}>PHIM</p>
              <p className={styles.number}>
                <CountUp
                  start={0}
                  end={52654}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=","
                // {...(countUp || {})}
                />
              </p>
            </div>
          </Card>
        </Col>
        <Col key={2} lg={6} md={12}>
          <Card
            className={styles.numberCard}
            bordered={false}
            bodyStyle={{ padding: 10 }}

          >
            <span className={styles.iconWarp} >
              <VideoCameraAddOutlined />
            </span>
            <div className={styles.content}>
              <p className={styles.title}>TV Show</p>
              <p className={styles.number}>
                <CountUp
                  start={0}
                  end={20000}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=","
                // {...(countUp || {})}
                />
              </p>
            </div>
          </Card>
        </Col>
        <Col key={2} lg={6} md={12}>
          <Card
            className={styles.numberCard}
            bordered={false}
            bodyStyle={{ padding: 10 }}

          >
            <span className={styles.iconWarp} >
              <UserOutlined className='!text-black' />
            </span>
            <div className={styles.content}>
              <p className={styles.title}>User</p>
              <p className={styles.number}>
                <CountUp
                  start={0}
                  end={123}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=","
                // {...(countUp || {})}
                />
              </p>
            </div>
          </Card>
        </Col>
        <Col key={2} lg={6} md={12}>
          <Card
            className={styles.numberCard}
            bordered={false}
            bodyStyle={{ padding: 10 }}

          >
            <span className={styles.iconWarp} >
              <CommentOutlined />
            </span>
            <div className={styles.content}>
              <p className={styles.title}>Comment</p>
              <p className={styles.number}>
                <CountUp
                  start={0}
                  end={123}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=","
                // {...(countUp || {})}
                />
              </p>
            </div>
          </Card>
        </Col>
      </Row>


      <div className='w-[600px] '>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ className: "w-[600px]" }}
        />


      </div>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   try {
//     context.res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate")
    

//     return {
//       props: {

//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       notFound: true,
//       revalidate: true,
//     };
//   }
// };

AdminDashbroad.Layout = LayoutAdmin

export default AdminDashbroad