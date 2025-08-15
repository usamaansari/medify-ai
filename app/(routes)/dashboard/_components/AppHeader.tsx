import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const menuOptions = [
    {
        id:1,
        name:"Dashboard",
        path:"/dashboard"
    },
    {
        id:2,
        name:"History",
        path:"/dashboard/history"
    
    },
    {
        id:3,
        name:"Pricing",
        path:"/dashboard/billing"
    }
]
function AppHeader() {
  return (
    <div className='flex justify-between items-center p-5 bg-gray-600 text-white'>
        <Link href={"/"}>
        <Image src={'/medify_logo.png'} alt='Logo' width={200} height={200} className='ml-10'/>
        </Link>
        <div className='flex space-4'>
            {
                menuOptions.map((option,index)=>(
                    <div key={index} className='flex flex-col items-center cursor-pointer hover:bg-gray-700 p-2 rounded'>
                        <Link href={option.path}>
                        <h2>{option.name}</h2>
                        </Link>
                    </div>
)) }
        </div>
        <UserButton />
    </div>
  )
}

export default AppHeader