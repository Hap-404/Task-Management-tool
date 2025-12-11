import React from 'react'
import UI_IMG from '../../assets/images/r2.png'

function AuthLayout( {children} ) {
  return <>
  <div className='flex'>
    <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col'>
        <h2 className='text-lg font-medium text-black'>
            Task Manager
        </h2>
        <div className='flex-1 flex flex-col justify-center'>
          {children}
        </div>
    </div>

    <div className='hidden md:flex w-[60vw] h-screen items-center justify-center bg-primary bg-[url("/bg.png")] bg-cover bg-no-repeat bg-center overflow-hidden p-8'>
        <img src={UI_IMG} className='w-64 lg:w-[50%]' />
    </div>

  </div>
  </>
}

export default AuthLayout