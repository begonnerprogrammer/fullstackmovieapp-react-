import React from 'react'

export interface Key{
 video:any;
  }

const Key = ({video}:Key) => {
  console.log("key is" + video.name)
  return (
    <div className='text-white'>
      <h1 className='text-white'>
        video.name
      </h1>
    </div>
  )
}

export default Key
