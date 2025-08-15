"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import NewConsultDialog from './NewConsultDialog';
import axios from 'axios';
import HistoryTable from './HistoryTable';
import { SessionDetail } from '../medical-agent/[sessionId]/page';

const HistoryList = () => {
    const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
   

    useEffect(()=>{
        GetHistoryList();
    },[])


    const GetHistoryList = async() =>{
      const result = await axios.get('/api/session-chat?sessionId=all');
      console.log(result.data);
      setHistoryList(result.data);
     
    }
  return (
    <div>
        {historyList.length>0?<div><HistoryTable historyList={historyList} /></div>:
        <div className='flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-2xl mt-5'>
            <Image src={"/medical-assistance.png"} alt="No History" width={150} height={150}/>
            <h2 className='text-center font-bold'>No History Found</h2>
            <p>It looks like you haven't consulted with any doctor yet</p>
           <NewConsultDialog />
        </div>
    }
    </div>
  )
}

export default HistoryList;