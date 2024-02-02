'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Link from 'next/link';
import Mobnav from './mobnav';
import Image from 'next/image';
import { signIn,signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const {data:session}=useSession();
  console.log(session)

    const [input,setInput]=useState("");
    const router=useRouter();
    const handlesubmit=(e)=>{
         e.preventDefault();
         setInput("");
         router.push(`/search/${input}?page=1`)
    }
  return (
    <>
      <div className='bg-primary border-b-2 border-stone-700 mb-5'>
   <div className='flex justify-between items-center py-4 px-2 md:px-10'>
    <div>
    <Link className='hidden md:block' href={'/discover/now_playing'}>
    <h2 className='text-[30px]'> <span className='text-orange-400'>MEGA</span>  <span className='text-red-400'> MOVIES</span></h2>
   </Link>
 
    </div>
   <form className='space-x-4 hidden md:block' onSubmit={handlesubmit}>
<input className='bg-secondary px-4 py-2 outline-none placeholder:text-textColor' type="text"
value={input} onChange={(e)=>setInput(e.target.value)} 
placeholder='Search For Movie'/>
<button className='bg-secondary text-textColor py-2 px-4 hover:bg-textColor hover:text-white'>
  Search
</button>
</form>
{
  session? <div className=' justify-center align-center'> <div className='flex  justify-center align-center'><h1 className='md:mr-2 md:text-xl hidden md:block'>Hello!{session?.user?.name}</h1><Image onClick={()=>{signOut()}} height={24} width={24} className='sm:h-2 sm:w-2 md:h-6 md:w-6' src={session?.user?.image} alt="" /></div><button className='hidden md:block border-2 border-white md:p-1 sm:text-[5px] md:text-[12px] '  onClick={()=>{signOut()}}>Signout</button></div> :<button className='border-2 border-white p-1 rounded-sm hover:p-2  transform duration-300 ease-in-out '   onClick={()=>{signIn("google")}}>Signin</button>
}
<Mobnav  input={input} setInput={setInput} handlesubmit={handlesubmit}/>


   </div>


      </div>
    </>
  )
}

export default Navbar
