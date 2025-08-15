import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorsAgentList'
import NewConsultDialog from './_components/NewConsultDialog'

function Dashboard() {
  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-2xl'> My Dashboard</h2>
            <NewConsultDialog />
        </div>
       
    <HistoryList />
    <DoctorsAgentList />
    </div>
  )
}

export default Dashboard