"use client";

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DoctorProps } from '../../_components/DoctorAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { toast } from 'sonner';

export type SessionDetail = {
    id: number;
    sessionId: string;
    createdBy: string;
    notes: string;
    selectedDoctor: DoctorProps; // Adjust type as needed
    createdOn: string;
    report: JSON; // Adjust type as needed
}
type messages = {
  role:string;
  text:string;
}
function MedicalAgent() {
    const {sessionId} = useParams();
    const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
    const [callStarted, setCallStarted] = useState(false);
   const [vapiInstance, setVapiInstance] = useState<Vapi| null>();
   const [currentRole, setCurrentRole] = useState<string|null>();
const [liveTranscript, setLiveTranscript] = useState<string>();
const [messages, setMessages] = useState<messages[]>([]);
const [loading, setLoading] = useState(false);
const router  = useRouter();

    useEffect(()=>{
        sessionId && GetSessionDetails();
    },[sessionId])
    
    const GetSessionDetails = async()=>{
      const result = await axios.get('/api/session-chat?sessionId=' + sessionId);
      console.log(result.data);
      setSessionDetail(result.data);

    }

    const StartCall = ()=>{
       const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
       setVapiInstance(vapi);
      // Start voice conversation
vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
      // Listen for events
vapi.on('call-start', () => {
  console.log('Call started');
  setCallStarted(true);
});
vapi.on('call-end', () => {
setCallStarted(false);
console.log('Call ended');
});
vapi.on('message', (message) => {
  if (message.type === 'transcript') {
    const {role,transcriptType,transcript} = message;
  
    console.log(`${message.role}: ${message.transcript}`);
    if(transcriptType=="partial"){
      setCurrentRole(role);
    setLiveTranscript(transcript);
    }
    else if(transcriptType=="final"){
     
      setMessages((prevMessages:any) => [
        ...(prevMessages || []),
        { role, text: transcript }
      ]);
      setLiveTranscript('');
       setCurrentRole(null);

    }

  }
});
vapi.on('speech-start', ()=>{
  console.log('Assistant started Speaking');
  setCurrentRole('assistant');
});
vapi.on('speech-end', ()=>{
  console.log('Assistant stopped Speaking');
  setCurrentRole('user');
});

    }

   

    const endCall = async() => {
      setLoading(true);
      if(!vapiInstance) return;

      vapiInstance.stop();
      vapiInstance.off('call-start', () => console.log("Call started"));
      vapiInstance.off('call-end', () => console.log("Call ended"));
      vapiInstance.off('message',(msg) => console.log("Message:", msg));
      vapiInstance.off('speech-start', () => console.log("Speech started"));
      vapiInstance.off('speech-end', () => console.log("Speech ended"));

        setCallStarted(false);
        setVapiInstance(null);

        const result = await GenerateReport();

        setLoading(false);
        toast.success('Report generated successfully!');
        router.replace('/dashboard');

      
    }

     const GenerateReport = async()=>{
      const result = await axios.post('/api/medical-report',{
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      })
      console.log(result.data);
      return result.data;

    }

    
  return (
    <div className='p-5 border rounded-3xl bg-secondary'>
      <div className='flex justify-between items-center'>
        <h2 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle  className={`h-4 w-4 rounded-full ${callStarted?"bg-green-500":"bg-red-500"}`}/>{callStarted?"Connected...":"Not Connected"}</h2>
        <h2 className='font-bold text-xl text-gray-400'>00:00</h2>
      </div>
     
        {sessionDetail && 
         <div className='flex items-center flex-col mt-10'>
        <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist || ""} 
        height={120} width={120} 
        className='h-[100px] w-[100px] object-cover rounded-full mb-2' />
        <h2 className='font-bold text-xl'>{sessionDetail?.selectedDoctor?.specialist}</h2>
        <p>AI Medical Voice Agent</p>
      <div className='mt-12 overflow-y-auto w-full max-h-[400px]'>
        {messages?.slice(-5).map((message, index) => (
          <div key={index} className={`p-2 my-1 rounded-md ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
            <strong>{message.role}:</strong> {message.text}
          </div>
        ))}

       {liveTranscript && liveTranscript?.length>0&& <h2 className='text-lg'>{currentRole}:{liveTranscript}</h2>}
        </div>
       {!callStarted? (<Button className='mt-20' onClick={StartCall} disabled={loading}>
        {loading?<Loader className='animate-spin'/>:<PhoneCall />}Start Call</Button>)
       :(<Button variant={'destructive'} className='mt-20' onClick={endCall} disabled={loading}>
        {loading? <Loader className='animate-spin' />:<PhoneOff />}Disconnect</Button>)}

      </div>
      }
      Medical Agent: {sessionId}</div>
  )
}

export default MedicalAgent