import React, { useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import Meta from '../../components/Shared/Meta'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
// import "./index.css"

type TypeInputs = {
    email: string,
    password: string,
    currentPassword: string,
    confirmPassword: string,
    providers: any
}

const ChangePasswordPage = () => {
  const router = useRouter()

  const{register, handleSubmit, watch, formState: {errors}} = useForm<TypeInputs>({ mode: "onTouched"})
  const onSubmit: SubmitHandler<TypeInputs> = async (user) => {
    console.log(user);
    
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

  const password = watch('password')
  return (
    <>
        <Meta
            title="Đổi mật khẩu"
            description="Đổi mật khẩu"
            image="/not-found.png"
        />
        <div className="py-20 h-screen px-44 account-content">
            <div className="account-header border-b-0 flex justify-between flex-col items-baseline">
                <h1 className='text-[40px]'>Thay đổi mật khẩu</h1> 
                
                <form className="login-form bg-[#736f6f]" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Email" {...register('email')} hidden/>

                    <div className="mb-4 relative w-[400px]">
                        <input  
                            className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"                        
                            type={passwordEye === false ? "password" : "text"}
                            placeholder="Nhập mật khẩu hiện tại"
                            {...register('currentPassword', 
                            {required: {value: true, message: "Vui lòng kiểm tra lại mật khẩu"}, 
                            minLength: {value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự."},
                            maxLength: {value: 100, message: "Mật khẩu không quá 100 ký tự."}
                            })}
                        />
                        {errors.password && <span className='errors'>{errors.password.message}</span>}              
                    </div>

                    <div className="mb-4 relative w-[400px]">
                        <input  
                            className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"                        
                            type={passwordEye === false ? "password" : "text"}
                            placeholder="Mật khẩu mới"
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

                    <div className="mb-4 relative w-[400px]">
                        <input                        
                            type={confirmPasswordEye === false ? "password" : "text"}
                            placeholder="Nhập lại mật khẩu"
                            className={`appearance-none w-full rounded py-3 px-3 text-white leading-tight`}
                            {...register("confirmPassword", { required: 'Bắt buộc phải nhập lại mật khẩu mới.',
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

                    <div className="flex items-center">
                        <button className="bg-blue-400 text-white font-bold w-36 py-2 px-3 rounded">
                            Lưu
                        </button>
                        <button className="bg-gray-700 ml-3 text-white font-bold w-36 py-2 px-3 rounded">
                            Hủy                 
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </>
  )
}

export default ChangePasswordPage