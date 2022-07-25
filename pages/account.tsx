/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from '../components/Shared/Image'
import Meta from '../components/Shared/Meta'
import { IUser } from '../models/type'


const account: NextPage = () => {

  const [user, setUser] = useState<IUser>()
  const router = useRouter()

  useEffect(() => {
      if(localStorage.getItem('user')){
        const {user} = JSON.parse(localStorage.getItem('user') as string);
        console.log(user);
        setUser(user)
      } else{
        router.push('/')
      }
    }, [])
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
        <div className='mt-60'>
          <img src={user?.image} alt="" />
          <p>Signed in as {user?.name}</p>
          <button onClick={() => {signOut(); localStorage.removeItem('user'); router.push('/')}}>Sign out</button>
        </div>
      </div>
    </>
  )
}

export default account