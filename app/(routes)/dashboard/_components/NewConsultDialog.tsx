"use client";
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Loader2, Router } from 'lucide-react'
import axios from 'axios';
import DoctorAgentCard, { DoctorProps } from './DoctorAgentCard';
import SuggestedDoctorCard from './SuggestedDoctorCard';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { SessionDetail } from '../medical-agent/[sessionId]/page';


function NewConsultDialog() {
    const [notes, setNotes] = useState<string>();
const [loading, setLoading] = useState(false);
const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorProps[]>();
const [selectedDoctor, setSelectedDoctor] = useState<DoctorProps>();
 const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
const router = useRouter();

const {has} = useAuth();
  //@ts-ignore
  const paidUser = has && has({plan:"pro"});

   useEffect(()=>{
          GetHistoryList();
      },[])
  
  
      const GetHistoryList = async() =>{
        const result = await axios.get('/api/session-chat?sessionId=all');
        console.log(result.data);
        setHistoryList(result.data);
       
      }

    const OnClickNext = async() =>{
      setLoading(true);
      const result = await axios.post('/api/suggest-doctors',{notes});
      console.log(result.data);
      setSuggestedDoctors(result.data);
      setLoading(false);
    }
    const onStartConsultation = async() =>{
      if(!selectedDoctor) return;
      setLoading(true);
      const result = await axios.post('/api/session-chat',{
        notes,
        selectedDoctor: selectedDoctor,
      });
      console.log(result.data);
         setLoading(false);
      if(result.data?.sessionId){
        console.log(result.data);
        // Route to conversation page
        router.push('/dashboard/medical-agent/'+ result.data.sessionId)     
       }
   
      // Handle the response, e.g., navigate to the consultation page or show a success message
    }
  return (
   <Dialog>
  <DialogTrigger asChild>
  <Button className='mt-3' disabled={!paidUser&&historyList?.length>=1}>+ Start a Consultation</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription asChild>
  {!suggestedDoctors? 
    <div>
      <h2>Add Symptoms or Any Other Details</h2>
      <Textarea
        placeholder="Add Details Here..."
        className="h-[200px] mt-1"
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
   : 
   <div>

<h2>Select The Doctor</h2>
 
    <div className='grid grid-cols-3 gap-3'>
      {suggestedDoctors.map((doctor, index) => (
        
          <SuggestedDoctorCard doctorAgent={doctor} setSelectedDoctor={()=>setSelectedDoctor(doctor)} 
          //@ts-ignore
          selectedDoctor={selectedDoctor} key={index}/>
      ))}
    </div>
      </div>
  }

</DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose asChild>
        <Button variant={'outline'}>Cancel</Button>
        </DialogClose>
        
        {!suggestedDoctors? <Button disabled={!notes} onClick={()=>OnClickNext()}>{loading && <Loader2 className='animate-spin' />} Next<ArrowRight /></Button>
        :<Button onClick={()=>onStartConsultation()}>Start Consultation</Button>}
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default NewConsultDialog