import React from 'react'
import { DoctorProps } from './DoctorAgentCard'
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconArrowRightFromArc } from '@tabler/icons-react'
import Image from 'next/image'

type props = {
    doctorAgent:DoctorProps,
    setSelectedDoctor: any,
    selectedDoctor: DoctorProps
}
const SuggestedDoctorCard = ({doctorAgent, setSelectedDoctor, selectedDoctor}:props) => {
  return (
    <div className={`flex flex-col items-center justify-center border-2 shadow rounded-2xl p-4
    hover:border-blue-500 hover:shadow-lg cursor-pointer ${selectedDoctor?.id == doctorAgent?.id && 'border-blue-500'}`} onClick={()=>setSelectedDoctor(doctorAgent)}>
            
            <Image src={doctorAgent?.image} alt={doctorAgent?.specialist} width={70} height={70} 
            className='w-[50px] h-[50px] object-cover rounded-4xl'
            />
            <h2 className='font-bold text-sm text-center'>{doctorAgent?.specialist}</h2>
            <p className='text-xs text-center line-clamp-2'>{doctorAgent?.description}</p>
        </div>
  )
}

export default SuggestedDoctorCard