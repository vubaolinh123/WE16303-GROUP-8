import React from 'react'
import { Breadcrumb,PageHeader } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

type AdminPageHeaderProps = {
    breadcrumb: string
}

const AdminPageHeader = ({breadcrumb}: AdminPageHeaderProps ) => {
    // const breadcrumb = useSelector(data => data.products.breadcrumb)
    // console.log("breadcrumb",breadcrumb);

    
    
    return (
      <div className="">
          <div className="pt-4">
              <Breadcrumb >
                  <Breadcrumb.Item href="/">
                      <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="/admin/dashboard">
                      <UserOutlined />
                      <span>Dashboard</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>abc</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <PageHeader
              className="site-page-header"
              title={breadcrumb}
            style={{paddingLeft: 0}}
          />
          



      </div>
  )
}

export default AdminPageHeader