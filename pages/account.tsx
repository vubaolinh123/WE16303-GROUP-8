/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from '../components/Shared/Image'
import Meta from '../components/Shared/Meta'


const account: NextPage = () => {
  const user = JSON.parse(localStorage.getItem('UserLoginWithGoogle') as string);
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
          <img src={user.image} alt="" />
          <p>Signed in as {user.name}</p>
          <button onClick={() => {signOut(); localStorage.removeItem('UserLoginWithGoogle')}}>Sign out</button>
        </div>
      </div>
    </>
  )
}

export default account