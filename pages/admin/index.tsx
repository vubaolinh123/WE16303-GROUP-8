import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import AdminPageHeader from '../../components/Display/AdminPageHeader'
import LayoutAdmin from '../../components/Layout/admin'
import { changeBreadcrumb, getListUser } from '../../features/user/user.slice'
import { LayoutProps } from '../../models/layout'

type Props = {}

const AdminDashbroad = (props: LayoutProps) => {
  const users = useAppSelector(item => item.user.value)
    const dispatch = useAppDispatch();
    console.log('users', users);
    useEffect(() => {
      dispatch(changeBreadcrumb("Quản Lý Users"))
      dispatch(getListUser())


  }, [])
  return (
    <div>
      <AdminPageHeader breadcrumb={"DashBroad"} />
      AdminDashbroad
    </div>
  )
}

AdminDashbroad.Layout = LayoutAdmin

export default AdminDashbroad