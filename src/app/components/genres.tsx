import Link from 'next/link';
import React from 'react'


export interface Igenres{
index:number;
name:string;
length:number;
id:number;
}

const Genres = ({index,name,length,id}:Igenres) => {
  return (
    <>
      <Link href={`/genres/${id}?genre=${name.toLowerCase()}`}>
        <div className='flex gap-4 text-textColor hover:tet-white'>
          <div>{name}</div>
          <div className='text-textColor'>{index+1 !== length ? "/" : ""}</div>
        </div>
      </Link>
    </>
  )
}

export default Genres
