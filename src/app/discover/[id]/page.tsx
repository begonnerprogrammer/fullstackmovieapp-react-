'use client'
import { BASE_URL } from '@/app/utils/const';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { Interface } from 'readline'
import axios from 'axios';
import Loading from '../../loading/page';
import Card from '../../components/card';
import Footer from '@/app/components/footer';
import {AiOutlinePlusCircle} from "react-icons/ai";

export interface Imovie{
  id:string;
  poster_path:string;
  title:string;
  release_date:string;
  movie:any;
}



const Discover = () => {


const [title,setTitle]=useState("");
const [movies,setMovies]=useState([]);
const [currnetPage,setCurrentPage]=useState(1);
const [totalPage,setTotalPage]=useState(1);
const [discover,setDiscover]=useState("");

const mainRef= useRef<HTMLDivElement>(null);

const router=useRouter();
const params=useParams();
const seachParams=useSearchParams();

useEffect(()=>{
  // mainRef?.current?.scrollTo({
  //   top:0,
  //   left:0,
  //   behavior:"smooth",
  // })
 


   const id=params.id.toString();
   const page=seachParams.get("page");
   setDiscover(id)

   switch(id){
    case "now_playing":
      setTitle("Now Playing Movies");
      break;
      case "top_rated":
      setTitle("TOP RATED Movies");
      break;
      case "popular":
      setTitle("Popular Movies");
      break;
      case "upcoming":
      setTitle("Upcoming Movies");
      break;
      default :
      setTitle("");
      break;
   }

//fetch data according to id
   axios.get(`${BASE_URL}/movie/${id}`,{
    params:{
      api_key:'d6661b84debe28a2b041dd58f1f45470',
      page,
    },
   })
   .then((responce)=>{
    console.log("RES",responce)
     setMovies(responce.data.results);
     setCurrentPage(responce.data.page);
     setTotalPage(responce.data.total_page);  
   }).catch((e)=>{console.log(e)})





},[params.id,seachParams.get("page")]);


const handlepage=(button:string)=>{
  let page="";
  if(button === "prev"){
    page=`page=${currnetPage-1}`;
    
  }
 else{
  page=`page=${currnetPage+1}`;
 
 }

 router.push(`/discover/${discover}?${page}`)
}



  return (

  
   <main className='bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-72px)] p-2 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb=[#222222a] scrollbar-track-primary relative'>

    <h2  className='text [24px] tracking-[2px]'>{title}</h2>
    {/* //loader logic */}
     {
      movies.length === 0 && <Loading/>
     } 
{/* //movies */}
     <div className='grid gap-8 moviesGrid place-items-center mt-8'>
          {
      movies.map((movie:Imovie)=>(<Card
      key={movie.id}
      img={movie.poster_path}
      id={movie.id}
      title={movie.title}
      release_Date={movie.release_date}
      movie={movie}
      />))
          }
      
     </div>


<div className='flex justify-center gap-16 py-6 pt-16'>
<button   onClick={()=> handlepage("prev")} className={`bg-purple-900 p-2 hover:bg-purple-950 ${currnetPage === 1 && "hidden"}`}>
Prev
</button>
<button onClick={()=>handlepage("next")} className={`bg-purple-900 p-2 hover:bg-purple-950 ${currnetPage === totalPage && "hidden"}`}>
Next
</button>
</div>



<div className='pb-20'>
   {
     
      movies.length !== 0 && <Footer/>    
   } 
</div>
   
   </main>
  )
}

export default Discover
