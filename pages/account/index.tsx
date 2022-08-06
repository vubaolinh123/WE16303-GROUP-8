import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaCoins, FaPen, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingPage from '../../components/Display/LoadingPage'
import Meta from '../../components/Shared/Meta'
import { signout } from "../../features/auth/auth.slice";



const account = () => {
  const { status } = useSession();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const valueUse = useSelector((state: any) => state.auth.value.user)
    
  const onHandleChangePass = () => {
    if(status === "authenticated") {
      toast.info("Đăng nhập bằng google (facebook) không thể đổi mật khẩu")
    } else {
      router.push("/account/password")
    }
  }

  if (!isLoggedIn) {
    router.push('/')
    return <LoadingPage/>
  }
  return (  
    <>
      <Meta
        title="User profile"
        description="User profile"
        image="/not-found.png"
      />
      <div>
        <div className="py-20 h-screen px-44 account-content">
          <div className="account-header flex justify-between items-baseline">
            <h1 className='text-[40px] text-white'>Tài khoản</h1>
            <Link href="./account/userprofile">
              <button className="bg-red-500 hover:bg-red-700 text-white flex items-center font-bold py-1 px-4 rounded">
                <FaPen className='mr-1' /> Sửa thông tin
              </button>
            </Link>
          </div>
          <div className="md:grid md:grid-cols-3 mt-4 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="leading-6 flex items-center text-white"><FaUserAlt className='mr-3'/>Thông tin cá nhân</h3>
                {valueUse.role === 1 &&
                  <Link href={'/admin'}>
                    <button type='button'
                    className='text-white mt-4 flex items-center hover:fill-red-500'
                    > <FaCoins className='mr-3'/> Chuyển đến Admin </button>
                  </Link>
                }
                <button type='button'
                  className='text-white mt-4 flex items-center hover:fill-red-500' 
                  onClick={() => {dispatch(signout())}}
                > <FaSignOutAlt className='mr-3'/> Đăng xuất </button>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className='mt-1 text-[#333]'>
                <p className=' text-[#666]'><span className='font-bold'>Email: </span>{valueUse?.email}</p>
                <p className='mt-2 text-[#666]'><span className='font-bold'>Name: </span>{valueUse?.name}</p>
                <p className='mt-2 text-[#666]'><span className='font-bold'>Ngày sinh: </span> {valueUse?.birthday ? valueUse?.birthday : 'Chưa cập nhật'}</p>
                <p className='mt-2 text-[#666]'>
                  <span className='font-bold'>Mật khẩu: </span> *******
                  <button onClick={onHandleChangePass} className="py-1 px-4 rounded"><FaPen className='fill-[#666] hover:fill-[white] duration-500' /></button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default account
