import React from 'react'
import CreateNote from './CreateNote'
import ListNotes from './ListNotes'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div className='pt-14 '>
    
    <h2 className=' text-2xl font-medium p-4'>Your Dashboard</h2>
        <div className="flex flex-col gap-3">
      <div className='flex flex-col gap-1.5 lg:flex-row lg:justify-between'>
        <Link href="/dashboard/create">
        <CreateNote />
        </Link>
      </div>
      <div>
        <ListNotes />
      </div>
    </div>
    </div>
  )
}

export default HomePage