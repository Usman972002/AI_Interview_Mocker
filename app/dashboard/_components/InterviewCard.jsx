import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const InterviewCard = ({ item }) => {

    const router = useRouter();

    const onStart =() =>{
        router.push(`/dashboard/interview/${item?.mockId}`)
    }

    const onFeedBack = () =>{
        router.push(`/dashboard/interview/${item?.mockId}/feedback`)
    }

  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{item?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{item?.jobExperience} Years Of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At :{item.createdAt}</h2>

        <div className='flex justify-between mt-2 gap-5'>
            <Button size="sm" variant="outline" className="w-full" onClick={()=>onFeedBack()}>Feedback</Button>
            <Button size="sm" className="w-full" onClick={()=>onStart()}>Start</Button>
        </div>
    </div>
  )
}

export default InterviewCard