import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Meta from "../../components/Shared/Meta";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changeuserprofile } from "../../features/auth/auth.slice";
import Link from "next/link";
import { store } from "../../app/store";


type TypeInputs = {
  name: string;
  email: string;
  birthday: string;
};

const ChangeUserProfilePage = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeInputs>({ mode: "onTouched" });

  const user = useSelector((state: any) => state.auth.value.user)

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user])

  const onSubmit: SubmitHandler<TypeInputs> = async (data) => {
    const yearOfBirh = new Date(data.birthday).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfBirh;
    const user = { ...data, age }
    try {
      await dispatch(changeuserprofile(user) as any)
      router.push("/account")
    } catch (error) {
      toast.success("Thay đổi thông tin thất bại")
    }
  };
  
  return (
    <>
      <Meta
        title="Đổi mật khẩu"
        description="Đổi mật khẩu"
        image="/not-found.png"
      />
      <div className="py-20 h-screen px-44 account-content">
        <div className="flex justify-between flex-col items-baseline">
          <h1 className="text-[40px] text-white">Thay đổi thông tin</h1>

          <form
            className="login-form bg-defaul"
            onSubmit={handleSubmit(onSubmit)}
          >

            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"
                type="text"
                readOnly
                {...register("email")}
              />
              {errors.name && (
                <span className="errors">{errors.name.message}</span>
              )}
            </div>

            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Họ tên
              </label>
              <input
                className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <span className="errors">{errors.name.message}</span>
              )}
            </div>

            <div className="mb-4 relative w-[400px]">
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Ngày sinh
              </label>
              <input
                className="appearance-none rounded w-full py-3 px-3 text-white leading-tight"
                type="Date"
                {...register("birthday")}
              />
              {errors.name && (
                <span className="errors">{errors.name.message}</span>
              )}
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

export default ChangeUserProfilePage;
