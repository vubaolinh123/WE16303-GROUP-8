import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Meta from "../../components/Shared/Meta";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Router, { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IUser } from "../../models/type";
import { useDispatch } from "react-redux";
import { changepass, signout } from "../../features/auth/auth.slice";
import Link from "next/link";
// import "./index.css"

type TypeInputs = {
  password: string;
  newpassword: string;
  confirmnewpassword: string;
  providers: any;
};

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TypeInputs>({ mode: "onTouched" });
  const [email, setEmail] = useState<string>();
  const [errorEmail, setErrorEmail] = useState<string>()

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

  useEffect(() => {
    const { auth } = JSON.parse(localStorage.getItem("persist:root") as string);
    setEmail(JSON.parse(auth)?.value?.user.email);
  }, []);

  const onSubmit: SubmitHandler<TypeInputs> = async (user) => {
    try {
      await dispatch(changepass({ ...user, email }) as any).unwrap();
      Router.push("/login")
    } catch (error : any) {
      toast.error("Mật khẩu cũ không chính xác");
        // setErrorEmail("Mật khẩu cũ không chính xác")
    }
  };

  const newpassword = watch("newpassword");
  const currentpassword = watch("password")
  return (
    <>
      <Meta
        title="Đổi mật khẩu"
        description="Đổi mật khẩu"
        image="/not-found.png"
      />
      <div className="py-20 h-screen px-44 account-content">
        <div className="flex justify-between flex-col items-baseline">
          <h1 className="text-[40px] text-white">Thay đổi mật khẩu</h1>

          <form
            className="login-form bg-defaul"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                  Mật khẩu hiện tại
              </label>
              <input
                className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"
                type="password"
                {...register("password")}
              />
              {errorEmail && (
                <span className="errors">{errorEmail}</span>
              )}
            </div>

            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                  Mật khẩu mới
              </label>
              <input
                className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"
                type={passwordEye === false ? "password" : "text"}
                {...register("newpassword", {
                  required: {
                    value: true,
                    message: "Vui lòng kiểm tra lại mật khẩu",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự.",
                  },
                  maxLength: {
                    value: 100,
                    message: "Mật khẩu không quá 100 ký tự.",
                  },
                  validate: (value) =>
                    value !== currentpassword ||
                    "Mật khẩu mới không được trùng với mật khẩu cũ.",
                })}
              />
              {errors.newpassword && (
                <span className="errors">{errors.newpassword.message}</span>
              )}
              <div className="text-2xl absolute top-[40px] right-3">
                {passwordEye === false ? (
                  <FaEyeSlash onClick={handlePasswordClick} />
                ) : (
                  <FaEye onClick={handlePasswordClick} />
                )}
              </div>
            </div>

            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                  Xác nhận mật khẩu mới
              </label>
              <input
                type={confirmPasswordEye === false ? "password" : "text"}
                className={`appearance-none w-full rounded py-3 px-3 text-white leading-tight`}
                {...register("confirmnewpassword", {
                  required: "Bắt buộc phải nhập lại mật khẩu mới.",
                  validate: (value) =>
                    value === newpassword ||
                    "Bắt buộc phải trùng với mật khẩu mới.",
                })}
              />
              {errors.confirmnewpassword && (
                <span className="errors">
                  {errors.confirmnewpassword.message}
                </span>
              )}
              <div className="text-2xl absolute top-[40px] right-3">
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
              <Link href="/account">
                <button className="bg-gray-700 ml-3 text-white font-bold w-36 py-2 px-3 rounded">
                  Hủy
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
