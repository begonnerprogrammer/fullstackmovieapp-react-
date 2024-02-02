'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from "../components/card"

import { remove } from '../Redux/movieslice';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_IMG_URL } from "../utils/const";

export interface Imovie{
  id:string;
  poster_path:string;
  title:string;
  release_date:string;
  movie:any;
}





const Page = () => {
  const dispatch=useDispatch();
  const movie=useSelector((state)=>state.cart);

const handleremove=(id:any)=>{
   dispatch(remove(id))
}
console.log(movie)
console.log(movie.backdrop_path)
  return (
    <> 
    {
      movie.length===0 ? <div className='text-white   md:absolute top-28 left-[600px] text-2xl'><h1>Add movies first</h1> <Link href={"/"}><button className='border-2 border-zinc-300 text-white p-1 ml-5 mt-2 hover:p-2  transition-all duration-300 ease-in-out'>Add movies</button></Link></div> :
       <div className= 'grid gap-4 moviesGrid place-items-center  bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-72px)] p-2 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb=[#222222a] scrollbar-track-primary relative'>
      {/* {
movie.map((movie:Imovie)=>(
<div key={movie.id}>
<Card 
      img={movie.poster_path}
      id={movie.id}
      title={movie.title}
      release_Date={movie.release_date}
      movie={movie}
      />
 <button className='border-2 border-white p-1 rounded-sm hover:p-2  transform duration-300 ease-in-out ' onClick={()=>(handleremove(movie.id))} >Remove</button>
</div>

))
} */}
{movie.map((movie)=>(
  <>
  <div>

 
  <Link href={`/details/${movie.id}`}>
  <div>
      <img src={`${BASE_IMG_URL}${movie.poster_path}`}  alt=""/>
      <h1>{movie.title}</h1>
  </div>
  </Link>
  <button className='border-2 border-white p-1 rounded-sm hover:p-2  transform duration-300 ease-in-out ' onClick={()=>(handleremove(movie.id))} >Remove</button>
  </div>
  </>
))

    }
</div>

    }
 





    </>
  )
}

export default Page
