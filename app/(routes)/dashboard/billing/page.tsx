import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div className='px-10 md:px-24 lg:px-48'>
        <h2 className='flex justify-center font-bold text-3xl mb-5'>Join Subscription</h2>
        <PricingTable />
    </div>
  )
}

export default Billing