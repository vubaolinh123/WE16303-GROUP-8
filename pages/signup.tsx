import { NextPage } from 'next'
import React from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import Meta from '../components/Shared/Meta'
import Image from "../components/Shared/Image"
import Link from 'next/link'
import Button from '../components/Shared/Button'
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa'

type TypeInputs = {
  email: string,
  password: string
}

const SignUpPage: NextPage<TypeInputs> = () => {
  const{register, handleSubmit, formState: {errors}} = useForm<TypeInputs>()
  const onSubmit: SubmitHandler<TypeInputs> = async (data) => {
    console.log(data)
  }
  return (
    <>
        <Meta
            title="404 Not Found"
            description="404 Not Found"
            image="/not-found.png"
        />
        <div>
          <Image
            src="https://assets.nflxext.com/ffe/siteui/vlv3/3a073c5f-0160-4d85-9a42-6f59aa4b64b9/3242af29-8ec6-41c7-890e-5bd7393e2047/VN-vi-20220718-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            opacity={0.5}
            className="w-screen absolute top-0 left-0 hidden md:block object-cover z-[-1] min-h-screen"
            alt=""
          />
          <div className="login-body">
            <div>
              <div className="login-form">
                <div className="login-form-main d-flex flex-row m-0">
                  <h2>Đăng ký</h2>
                  <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <input {...register('email', {required: true})} className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" type="text" placeholder="Email hoặc số điện thoại"/>
                      {/* {errors.email && <span className='errors'>Email không được để trống.</span>} */}
                      {errors.email && errors.email.type === "required" && <span className='errors'>Email không được để trống.</span>}
                    </div>
                    <div className="mb-6">
                      <input {...register('password', {required: true, minLength: 8})} className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" type="password" placeholder="Mật khẩu"/>
                      {errors.password && errors.password.type === "required"  && <span className='errors'>Vui lòng kiểm tra lại mật khẩu.</span>}
                      {errors.password && errors.password.type === "minLength"  && <span className='errors'>Mật khẩu ít nhất 8 kí tự.</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="bg-[#e50914] text-white font-bold w-full py-3 px-4 rounded">
                        Đăng nhập
                      </button>
                    </div>
                    <div className="login-form-help mt-4 flex items-center justify-between">
                            <label className="hover:text-gray-500 block text-sm text-gray-400">
                              <div className="flex items-center justify-between">
                                  <input type="checkbox" className="mr-2 text-gray-400 rounded"/>
                                  <span>Ghi nhớ mật khẩu</span>
                              </div>
                            </label>
                
                        <div className="text-sm">
                            <a href="#" className="font-medium text-gray-400 hover:text-gray-500 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>
                  </form>
                </div>
                <div className="login-form-other">
                  <div className="login-signup text-gray-400 flex justify-between">
                    <span>Bạn chưa có tài khoản?</span> <Link href={`/signup`}><a className='text-white hover:underline'>Đăng ký ngay.</a></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default SignUpPage