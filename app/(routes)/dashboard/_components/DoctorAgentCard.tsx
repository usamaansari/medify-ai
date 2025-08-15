"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import { IconArrowRight, IconArrowRightFromArc } from '@tabler/icons-react'
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export type DoctorProps = {
    id: number
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId: string,
    subscriptionRequired: boolean
}

type props = {
    doctorAgent:DoctorProps
}

function DoctorAgentCard({doctorAgent}:props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {has} = useAuth();
  //@ts-ignore
  const paidUser = has && has({plan:"pro"});


const onStartConsultation = async() =>{
      if(!doctorAgent) return;
      setLoading(true);
      const result = await axios.post('/api/session-chat',{
        notes:"New Query",
        selectedDoctor: doctorAgent,
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
    <div className='relative'>
        <Badge className='absolute m-2'>{doctorAgent.subscriptionRequired ? 'Premium' : 'Free'}</Badge>
        <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={100} height={100} 
        className='w-full h-[250px] object-cover rounded-lg mb-4'
        />
        <h2 className='font-bold text-xl'>{doctorAgent.specialist}</h2>
        <p className='line-clamp-2 mt-1'>{doctorAgent.description}</p>
        <Button className='mt-1' disabled={!paidUser&&doctorAgent.subscriptionRequired} onClick={onStartConsultation}>Start Consultation {loading? <Loader2Icon className='animate-spin'/>: <IconArrowRight/>}</Button>
    </div>
  )
}

export default DoctorAgentCard