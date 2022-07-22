import { NextPage } from 'next'
import React from 'react'
import Meta from '../components/Shared/Meta'
import Image from "../components/Shared/Image"
import Link from 'next/link'
import Button from '../components/Shared/Button'
import { FaInfoCircle, FaPlayCircle } from 'react-icons/fa'

type Props = {}

const SignInPage: NextPage<Props> = () => {
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
                  <h2>Đăng nhập</h2>
                  <form className="login-form">
                    <div className="mb-4">
                      <input className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" type="text" placeholder="Email hoặc số điện thoại"/>
                    </div>
                    <div className="mb-6">
                      <input className="appearance-none border-none rounded w-full py-3 px-3 text-white mb-3 leading-tight" type="password" placeholder="Mật khẩu"/>
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="bg-[#e50914] text-white font-bold w-full py-3 px-4 rounded" type="button">
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

export default SignInPage