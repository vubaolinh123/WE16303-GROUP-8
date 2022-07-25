/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import Meta from '../components/Shared/Meta'
import Image from "../components/Shared/Image"
import Link from 'next/link'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {getProviders, useSession, signIn} from 'next-auth/react'
import Router from 'next/router'

type TypeInputs = {
  email: string,
  password: string,
  providers: any
}

const SignInPage = ({providers}: TypeInputs) => {
  
  const { data: session, status } = useSession()
  
  const{register, handleSubmit, formState: {errors}} = useForm<TypeInputs>({ mode: "onTouched"})
  const onSubmit: SubmitHandler<TypeInputs> = async (data) => {
    console.log(data)
  }
  // handle password eye
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };
  
  if (status === "authenticated") {    
    localStorage.setItem('user', JSON.stringify(session.user || []))
    Router.push('/account') 
  }

  return (
    <>
        <Meta
            title="Login"
            description="Login"
            image="/not-found.png"
        />
        <div>
          <Image
            src="/bg-loginPage.jpg"
            opacity={0.5}
            className="w-screen absolute top-0 left-0 hidden md:block object-cover z-[-1] min-h-[1000px]"
            alt=""
          />
          <div className="login-body">
            <div>
              <div className="login-form">
                <div className="login-form-main d-flex flex-row m-0">
                  <h2>Đăng nhập</h2>
                  <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input 
                            className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" 
                            type="text" placeholder="Email"
                            {...register('email', {required: {value: true, message: "Email không được để trống"},
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email không đúng định dạng"
                            }
                            })}
                        />
                        {errors.email && <span className='errors'>{errors.email.message}</span>}
                    </div>

                    <div className="mb-4 relative">
                        <input  
                            className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight"                        
                            type={passwordEye === false ? "password" : "text"}
                            placeholder="Mật khẩu"
                            {...register('password', 
                            {required: {value: true, message: "Vui lòng kiểm tra lại mật khẩu"}, 
                            minLength: {value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự."},
                            maxLength: {value: 100, message: "Mật khẩu không quá 100 ký tự."}
                            })}
                        />
                        {errors.password && <span className='errors'>{errors.password.message}</span>}
                        <div className="text-2xl absolute top-[10px] right-3">
                            {passwordEye === false ? (
                                <FaEyeSlash onClick={handlePasswordClick} />
                            ) : (
                                <FaEye onClick={handlePasswordClick} />
                            )}
                        </div>                      
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
                  <div className='form-login-line'>or</div>
                  <div className='mt-6'>
                    <button
                      className="flex items-center justify-center bg-white text-black font-bold py-3 px-4 gap-3 rounded w-full"
                      onClick={() =>signIn(providers!.google.id)}
                    >
                      <img className="w-6 h-6" src="/google.svg" alt="" />

                      <span>Login With Google</span>
                    </button>
                    <button
                      className="flex items-center justify-center bg-white text-black font-bold py-3 px-4 mt-4 gap-3 rounded w-full"
                      onClick={() =>signIn(providers!.facebook.id)}
                    >
                      <img className="w-7 h-7" src="/icons8-facebook.svg" alt="" />

                      <span>Login With Facebook</span>
                    </button>
                  </div>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const providers = await getProviders();
  try {
    return {
      props: {
        providers,
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

export default SignInPage