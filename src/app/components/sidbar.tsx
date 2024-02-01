'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '../utils/const';
import Link from 'next/link';
import { useSelector } from 'react-redux';
export interface states{
  state:any;
  cart:any;
}
const Sidbar = () => {
 
    const [genres,setGenres]=useState([]);
    const [selectedGenre,setSelectedGenre]=useState("");
    const params=useParams();
    const searchParams=useSearchParams();
    const addmovie=useSelector((state:states)=>state.cart)

interface Igenre{
    id:string,
    name:string
}

useEffect(()=>{
    axios.get(`${BASE_URL}/genre/movie/list?api_key=d6661b84debe28a2b041dd58f1f45470&language=en-US`).then(({data})=>{
        setGenres(data.genres)
        console.log(data.genres)
    })
},[])



useEffect(()=>{
  if( searchParams.get("genre")){
        setSelectedGenre(searchParams.get("genre")?.toString()!);
        return;
    }

    setSelectedGenre(params?.id?.toString());
},[params.id]);



  return (
    
    <div className='bg-primary px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin
    scrollbar-thumb-[#22222a] scrollbar-track-primary hidden sm:block'>
      <div className='flex flex-col gap-4 pt-4'>
      <Link href={"/favmovies"}>
<button className='sidebarTitle border-2 rounded-sm border-zinc-300 text-white p-2  hover:text-yellow-300  transition-all ease-in-out'>
  MyMovies:{addmovie.length}
</button>
</Link>
      </div>
    <div className='flex flex-col gap-4 pt-4'>
<p className='sidebarTitle'>Discover</p>

<Link href="/discover/now_playing">
<p className={`sidebarLink ${selectedGenre==="now_playing" ? "sidebarActive" : ""} `}>
Now playing
</p>
</Link>


<Link href="/discover/top_rated">
<p className={`sidebarLink ${selectedGenre==="top_rated" ? "sidebarActive" : ""} `}>
Top rated
</p>
</Link>

<Link href="/discover/popular">
<p className={`sidebarLink ${selectedGenre==="popular" ? "sidebarActive" : ""} `}>
Popular
</p>
</Link>


<Link href="/discover/upcoming">
<p className={`sidebarLink ${selectedGenre==="upcoming" ? "sidebarActive" : ""} `}>
Upcoming
</p>
</Link>

    </div>
   
<div className='flex flex-col gap-4 pt-4'>
    <p className='sidebarLink ml-1 text-[20px]'>Genres</p>
    
    {
    genres.map((genre:Igenre) => (<Link key={genre.id} href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}` } className='w-fit'>
      <p className={`sidebarLink ${genre.name.toLowerCase() === selectedGenre ? "sidebarActive" : "" }`}>
        {genre.name}
      </p>
      </Link>
      ))}
</div>





    </div>
  )
}

export default Sidbar
