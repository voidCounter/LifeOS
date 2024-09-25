import { LoaderCircle } from "lucide-react";

import React from 'react'

const GeneralLoading = ({message} : {message?:string}) => {
    return (
        <div className='w-full h-full flex flex-row gap-2 items-center justify-center'>
            <LoaderCircle className={"animate-spin mr-2"}
                strokeWidth={1} />
            <h3 className="text-base font-medium text-black">{message ? message : "Loading..."}</h3>
        </div>
    )
}

export default GeneralLoading