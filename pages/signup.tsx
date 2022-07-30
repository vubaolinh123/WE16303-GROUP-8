/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import Meta from '../components/Shared/Meta'
import Image from "../components/Shared/Image"
import Link from 'next/link'
import Button from '../components/Shared/Button'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { Router, useRouter } from 'next/router'
import { signinwithnextauth, signup } from '../api/auth'

type TypeInputs = {
    name: string,
    email: string,
    password: string,
    birthday: string,
    confirmPassword: string,
    providers: any
}

const SignUpPage = ({providers}: TypeInputs) => {
  const router = useRouter()

  const{register, handleSubmit, watch, formState: {errors}} = useForm<TypeInputs>({ mode: "onTouched"})
  const onSubmit: SubmitHandler<TypeInputs> = async (user) => {
    const yearOfBirh = (new Date(user.birthday)).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirh;
    signup({...user, age});
    router.push('/login') 
  }
  // handle password eye
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  // handle confirm password eye
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const { data: session, status } = useSession()
  useEffect(() => {
    (async() => {
      if (status === "authenticated") {
        const {data} = await signinwithnextauth(session.user);    
        console.log(data);        
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/account') 
        };
    })()
  }, [status])

  const password = watch('password')
  return (
    <>
        <Meta
            title="Đăng ký"
            description="Đăng ký"
            image="/not-found.png"
        />
        <div>
          <Image
            src="/bg-loginPage.jpg"
            opacity={0.5}            
            className="w-screen fixed top-0 bottom-0 left-0 hidden md:block object-cover z-[-1]"
            alt=""
          />
          <div className="login-body">
            <div>
              <div className="login-form">
                <div className="login-form-main d-flex flex-row m-0">
                  <h2>Đăng ký</h2>
                  <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input 
                            className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" 
                            type="text" placeholder="Họ tên"
                            {...register('name', {required: {value: true, message: "Họ tên không được để trống"},
                            minLength: {value: 6, message: "Họ tên phải có ít nhất 6 ký tự."},
                            maxLength: {value: 100, message: "Họ tên không quá 100 ký tự."}
                            })} 
                        />
                        {errors.name && <span className='errors'>{errors.name.message}</span>}
                    </div>

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

                    <div className="mb-4 relative">
                        <input                        
                            type={confirmPasswordEye === false ? "password" : "text"}
                            placeholder="Nhập lại mật khẩu"
                            className={`appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight`}
                            {...register("confirmPassword", { required: 'Bắt buộc phải nhập lại mật khẩu.',
                            validate: (value) =>
                            value === password || "Mật khẩu không chính xác.",
                            })}
                        />
                        {errors.confirmPassword && <span className="errors">{errors.confirmPassword.message}</span>}
                        <div className="text-2xl absolute top-[10px] right-3">
                            {confirmPasswordEye === false ? (
                                <FaEyeSlash onClick={handleConfirmPasswordClick} />
                            ) : (
                                <FaEye onClick={handleConfirmPasswordClick} />
                            )}
                        </div>      
                    </div>

                    <div className="mb-6">
                        <input {...register('birthday', {required: true})} className="appearance-none border-none rounded w-full py-3 px-3 text-white leading-tight" type="date"/>
                        {errors.birthday && <span className='errors'>Vui lòng chọn ngày tháng năm sinh.</span>}
                    </div>


                    <div className="flex items-center justify-between">
                        <button className="bg-[#e50914] text-white font-bold w-full py-3 px-4 rounded">
                            Đăng ký
                        </button>
                    </div>
                  </form>
                  <div className='form-login-line'>or</div>
                  <div className='mt-6'>
                    <button
                      className="flex items-center justify-center bg-[#181a1b] text-white font-bold py-3 px-4 gap-3 rounded w-full"
                      onClick={() =>signIn(providers!.google.id)}
                    >
                      <img className="w-6 h-6" src="/google.svg" alt="" />
                      Login With Google
                    </button>
                    <button
                      className="flex items-center justify-center bg-[#181a1b] text-white font-bold py-3 px-4 mt-4 gap-3 rounded w-full"
                      onClick={() =>signIn(providers!.facebook.id)}
                    >
                      <img className="w-7 h-7" src="/icons8-facebook.svg" alt="" />
                      Login With Facebook
                    </button>
                  </div>
                </div>
                <div className="login-form-other">
                    <div className="login-signup text-gray-400 flex justify-between">
                        Bạn đã có tài khoản? <Link href={`/login`}><a className='text-white hover:underline'>Quay lại đăng nhập.</a></Link>
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


export default SignUpPage