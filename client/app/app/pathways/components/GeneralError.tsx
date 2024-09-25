import { Info } from 'lucide-react'
import React from 'react'

const GeneralError = ({message}: {message?:string}) => {
  return (
    <div className='w-full h-full flex flex-row items-center justify-center overflow-hidden'>
        <Info className={"mr-2"}
            strokeWidth={1} />
        <h3 className="text-base font-medium text-black">
            {message ? message : ""} Please try again later.
        </h3>
        
    </div>
  )
}

export default GeneralError