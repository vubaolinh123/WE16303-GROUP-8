import { GetStaticProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Meta from "../../components/Shared/Meta";
import Image from "../../components/Shared/Image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { loginwithnextauth } from "../../features/auth/auth.slice";
import { signup } from "../../api/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PrivateClient from "../../components/PrivateRouter/PrivateClient";

type TypeInputs = {
  name: string;
  email: string;
  password: string;
  birthday: string;
  confirmPassword: string;
  providers: any;
};

const SignUpPage = ({ providers }: TypeInputs) => {
  
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TypeInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<TypeInputs> = async (data) => {
    try {
      const yearOfBirh = new Date(data.birthday).getFullYear();
      const currentYear = new Date().getFullYear();
      const age = currentYear - yearOfBirh;
      const user = { ...data, age }
      await signup(user);
      toast.success("Đăng ký thành công");
      router.push("/account/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

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

  const { data: session, status } = useSession();
  useEffect(() => {
    if (!isLoggedIn) {
      (async () => {
        if (status === "authenticated") {
          try {
            await dispatch(loginwithnextauth(session.user) as any);
            setTimeout(() => {
              router.push("/account");
            }, 2000);
          } catch (error) {}
        }
      })();
    }
  }, [status]);

  const password = watch("password");
  return (
    <PrivateClient>
      <>
        <Meta title="Đăng ký" description="Đăng ký" image="/not-found.png" />
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
                    <div className="mb-4 relative input-group">
                      <input
                        className={`appearance-none text-sm shadow-none border-none rounded w-full pt-5 pb-[6px] px-3 text-white leading-tight ${errors.name && "input-invalid" }`}
                        type="text"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "Họ tên không được để trống",
                          },
                          minLength: {
                            value: 6,
                            message: "Họ tên phải có ít nhất 6 ký tự.",
                          },
                          maxLength: {
                            value: 100,
                            message: "Họ tên không quá 100 ký tự.",
                          },
                        })}
                      />
                      <label htmlFor="">Họ tên</label>
                      {errors.name && (
                        <span className="errors">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="mb-4 relative input-group">
                      <input
                        className={`appearance-none text-sm shadow-none border-none rounded w-full pt-5 pb-[6px] px-3 text-white leading-tight ${errors.email && "input-invalid" }`}
                        type="text"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email không được để trống",
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Email không đúng định dạng",
                          },
                        })}
                      />
                      <label htmlFor="">Email</label>
                      {errors.email && (
                        <span className="errors">{errors.email.message}</span>
                      )}
                    </div>

                    <div className="mb-4 relative input-group">
                      <input
                        className={`appearance-none text-sm shadow-none border-none rounded w-full pt-5 pb-[6px] px-3 text-white leading-tight ${errors.password && "input-invalid" }`}
                        type={passwordEye === false ? "password" : "text"}
                        {...register("password", {
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
                        })}
                      />
                      <label htmlFor="">Mật khẩu</label>
                      {errors.password && (
                        <span className="errors">{errors.password.message}</span>
                      )}
                      <div className="text-2xl absolute top-[10px] right-3">
                        {passwordEye === false ? (
                          <FaEyeSlash onClick={handlePasswordClick} />
                        ) : (
                          <FaEye onClick={handlePasswordClick} />
                        )}
                      </div>
                    </div>

                    <div className="mb-4 relative input-group">
                      <input
                        type={confirmPasswordEye === false ? "password" : "text"}
                        className={`appearance-none text-sm shadow-none border-none rounded w-full pt-5 pb-[6px] px-3 text-white leading-tight ${errors.confirmPassword && "input-invalid" }`}
                        {...register("confirmPassword", {
                          required: "Bắt buộc phải nhập lại mật khẩu.",
                          validate: (value) =>
                            value === password || "Mật khẩu không chính xác.",
                        })}
                      />
                      <label htmlFor="">Nhập lại mật khẩu</label>
                      {errors.confirmPassword && (
                        <span className="errors">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                      <div className="text-2xl absolute top-[10px] right-3">
                        {confirmPasswordEye === false ? (
                          <FaEyeSlash onClick={handleConfirmPasswordClick} />
                        ) : (
                          <FaEye onClick={handleConfirmPasswordClick} />
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <input
                        {...register("birthday", { required: true })}
                        className={`appearance-none text-sm shadow-none border-none rounded w-full py-4 px-3 text-white leading-tight ${errors.birthday && "input-invalid" }`}
                        type="date"
                      />
                      {errors.birthday && (
                        <span className="errors">
                          Vui lòng chọn ngày tháng năm sinh.
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button className="bg-[#e50914] text-white font-bold w-full py-3 px-4 rounded">
                        Đăng ký
                      </button>
                    </div>
                  </form>
                  <div className="form-login-line">or</div>
                  <div className="mt-6">
                    <button
                      className="flex items-center justify-center bg-[#181a1b] text-white font-bold py-3 px-4 gap-3 rounded w-full"
                      onClick={() => signIn(providers!.google.id)}
                    >
                      <img className="w-6 h-6" src="/google.svg" alt="" />
                      Login With Google
                    </button>
                    <button
                      className="flex items-center justify-center bg-[#181a1b] text-white font-bold py-3 px-4 mt-4 gap-3 rounded w-full"
                      onClick={() => signIn(providers!.facebook.id)}
                    >
                      <img
                        className="w-7 h-7"
                        src="/icons8-facebook.svg"
                        alt=""
                      />
                      Login With Facebook
                    </button>
                  </div>
                </div>
                <div className="login-form-other">
                  <div className="login-signup text-gray-400 flex justify-between">
                    Bạn đã có tài khoản?{" "}
                    <Link href={`/account/login`}>
                      <a className="text-white hover:underline">
                        Quay lại đăng nhập.
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </PrivateClient>
  );
};
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

export default SignUpPage;
