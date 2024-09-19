import React from 'react'
import { PathwayInputForm } from '../components/PathwayInputForm'
import PathwayChatComp from '../components/PathwayChatComp'

const CreateRoadmap = () => {
  return (
    <div className='flex flex-row w-full h-full justify-between'>
      <PathwayInputForm />
      <PathwayChatComp />
    </div>
  )
}

export default CreateRoadmap