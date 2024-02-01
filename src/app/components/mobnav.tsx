
import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch,useEffect, SetStateAction, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/const';
import {AiOutlineMenu} from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { signIn,signOut, useSession } from 'next-auth/react';
interface propsType{
    input :string,
    setInput:Dispatch<SetStateAction<String>>,
    handlesubmit: (e:React.FormEvent) => void
}


interface Igenre{
  id:string,
  name:string
}
export interface reduxvalue{
  state:any;
  cart:any
}
const Mobnav = ({input,setInput,handlesubmit}:propsType) => {
  const {data:session}=useSession();
  // state to close and open mebilemenu
    const [isopen,setIsopen]=useState(false);
    const [genre,setGenres]=useState([]);
    const [selectedGenre,setSelectedGenre]=useState("");
     const Params=useParams();
     const searchParams=useSearchParams();
     const addmovie=useSelector((state:reduxvalue)=>state.cart)
//Fetching data
useEffect(()=>{
axios.get(`${BASE_URL}/genre/movie/list?api_key=d6661b84debe28a2b041dd58f1f45470&language=en-US`)
.then(({data}) =>{
        console.log(data)
     setGenres(data.genres)
    }
)
.catch((e)=>{console.log(e)})
},[])

//getting params to get current genre
useEffect(()=>{
if(searchParams.get("genre")){
  setSelectedGenre(searchParams.get("genre")!);
  return;
}

setSelectedGenre(Params.id?.toString());



},[searchParams.get("genre"),Params.id]);
  return (
    <>
      <form className='sm:hidden flex justify-between w-[100%]' 
      onSubmit={handlesubmit}>
    <div className='mt-1' onClick={()=>{setIsopen(true)}}>
       <AiOutlineMenu size={30} />
    </div>
    <div className='space-x-4'>
   <input type="text"  onChange={(e)=>setInput(e.target.value)} value={input} placeholder='Search Movies...'  className=' bg-secondary px-4 py-2 outline-none placeholder:text-color text-[14px] w-[180px]' />
    <button type='submit'
    className='bg-secondary text-textColor py-2 px-2 hover:bg-textColor hover:text-white[14px]'>
     Search
    </button>
  
    </div>
      </form>
      
    {/* {
  session? <button className='border-2 border-white p-1'  onClick={()=>{signOut()}}>Signout</button>:<button className='border-2 border-white p-1 rounded-md hover:p-2  transform duration-300 ease-in-out '   onClick={()=>{signIn("google")}}>Signin</button>
}  */}

{/* Full screen nav */}
<div className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-10
overflow-scroll ${isopen ? "block" : "hidden" }`}>

  <div className='sticky top-0 bg-primary py-4 w-[100%]'>
<IoMdClose onClick={()=>setIsopen(false)} className="absolute top-0 right-0 m-2 mt-7" size={20} />
<Link className='w-fit' href="/discover/now_playing" onClick={()=>{setIsopen(false)}}>
  <div className='sidebarTitle text-[28px] text-center'>
    MovieMania
  </div>
</Link>
  </div>


{/* options of mobile menu */}
<div className='px-4 pb-16'>
<div className='flex flex-col gap-4 pt-4'>
<div className='flex flex-col gap-4 pt-4'>
      <Link href={"/favmovies"}>
<button className='sidebarTitle border-2 border-zinc-300 text-white p-2  hover:text-yellow-300  transition-all ease-in-out'>
  MyMovies:{addmovie.length}
</button>
</Link>
      </div>
  <p className='sidebarTitle'>Discover</p>
<Link className='w-fit' href="/discover/now_playing" 
onClick={()=>setIsopen(false)}>
  <p className={`sidebarLink ${selectedGenre === "now_playing" ? "sidebarActive" : "" }`}>Now Playing</p>
</Link>



<Link className='w-fit' href="/discover/top_rated" 
onClick={()=>setIsopen(false)}>
  <p className={`sidebarLink ${selectedGenre === "top_rated" ? "sidebarActive" : "" }`}>Top rated</p>
</Link>




<Link className='w-fit' href="/discover/popular" 
onClick={()=>setIsopen(false)}>
  <p className={`sidebarLink ${selectedGenre === "popular" ? "sidebarActive" : "" }`}>Popular</p>
</Link>


<Link className='w-fit' href="/discover/upcoming" 
onClick={()=>setIsopen(false)}>
  <p className={`sidebarLink ${selectedGenre === "upcoming" ? "sidebarActive" : "" }`}>Upcoming</p>
</Link>



  {/* category names for mobilemenu */}
<div className='flex flex-col gap-4 pt-4'>
  <p className='sidebarTitle'>generes</p>
  {
    genre.map((genre:Igenre) => (<Link key={genre.id} href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}` } className='w-fit' onClick={()=>{setIsopen(false)}}>
      <p className={`sidebarLink ${genre.name.toLowerCase() === selectedGenre ? "sidebarActive" : "" }`}>{genre.name}
      </p>
      </Link>
      ))}
</div>

</div>
</div>





</div>
    </>
  )
}

export default Mobnav
