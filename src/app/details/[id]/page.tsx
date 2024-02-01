'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BASE_IMG_URL } from '../../utils/const';
import Loading from "../../loading/page"
import Genres from "../../components/genres"
import dynamic from 'next/dynamic';
import {IoMdClose} from "react-icons/io";
import {BsPlayFill} from "react-icons/bs";
import Footer from '@/app/components/footer';
import { MdFileDownloadDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { add } from "../../Redux/movieslice";
const ReactPlayer=dynamic(()=>import("react-player/lazy"),{ssr:false});



export interface Root{
  adult:boolean;
  backdrop_path:string;
  belongs_to_collection: BelongsToCollection;
  budget:number;
  genres:Genre[];
  homepage:string;
  id:number;
  imdb_id:string;
  original_language:string;
  original_title:string;
  overview:string;
  popularity:number;
  poster_path:string;
  production_companies:ProductionCompany[];
  production_countries:ProductionCountry[];
  release_date:string;
  revenue:number;
  runtime:number;
  spoken_languages:SpokenLanguage[];
  status:string;
  tagline:string;
  title:string;
  video:boolean;
  vidoes:Videos;
  vote_average:number;
  vote_count:number;
}

export interface BelongsToCollection{
  id:number;
  name:string;
  poster_path:string;
  backdrop_path:string;
}

export interface Genre{
  id:number;
  name:string;
}
export interface ProductionCompany{
  id:number;
  logo_path:string;
  name:string;
  origin_country:string;
}
export interface ProductionCountry{
  iso_3166_1:string;
  name:string;
}
export interface SpokenLanguage{
  english_name:string;
  iso_639_:string;
  name:string;
}
export interface Videos{
  results:Result[];
}
export interface Result{
   iso_639_1:string;
   iso_3166_1:string;
   name:string;
   key:string;
   site:string;
   size:number;
   type:string;
   official:boolean;
   published_at:string;
   id:string;
}









const Moviedetails = () => {

const [movie,setMovie]=useState<Root>();
const [showplayer,setShowplayer]=useState(false);
const [trailer,setTrailer]=useState("");
const [url,setUrl]=useState("");

const router=useRouter();
const params=useParams();
const mainref=useRef<HTMLDivElement>(null);



useEffect(()=>{
  axios.get(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=d6661b84debe28a2b041dd58f1f45470&append_to_response=videos`
  ).then((res)=>{
    const trailer=res.data.videos.results.findIndex(
      (element) => element.type === "Trailer"
    );
    const url=`${res.data.videos.results[trailer].key}`;
     setUrl(url);
    console.log(res.data);
    setMovie(res.data);
  } );
},[params.id]);



useEffect(()=>{
  const trailerIndex=movie?.vidoes?.results?.findIndex(
    (element) => element.type === "Trailer"
  );
const trailerURL=`https://www.youtube.com/watch?v=${url}`;
setTrailer(trailerURL)
},[movie]);
  

const startplayer =()=> {
  setShowplayer(true);
}
const dispatch=useDispatch();
//redux part
const addmovie=(movie)=>{
  dispatch(add(movie))
}
  return (
    <>
      <main className='bg-secondary p-8 relative max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll
      scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary' ref={mainref}>
       {movie===null && <Loading/>}

       <div className='text-textColor hover:text-white absolute right-0 top-0 m-2 cursor-pointer' onClick={router.back}>
<IoMdClose size={28}/>
       </div>
      
      <div className='flex justify-center items-center pt-4 md:pt-0'>
       <div className='grid md:grid-cols-[300px,1fr] max-w-[1200px] gap-12'>
        <div>
          <img src={`${BASE_IMG_URL}${movie?.poster_path}`} alt={movie?.title} />
        </div>

   <div className='sapce-y-6 md:space-y-3 text-textColor'>
    <div className='uppercase text-[26px] md:text-[34px] font-medium pr-4 text-white'>
{movie?.title}


    </div>

<div className='flexgap-4 flex-wrap'>
  {movie?.genres?.map((genre,index)=>(<Genres key={genre.id} index={index} length={movie.genres.length} name={genre.name} id={genre.id}/>))}
</div>

  <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
    <div>Language: {movie?.original_language?.toUpperCase()}</div>
    <div>Release: {movie?.release_date}</div>
    <div>Runtime:{movie?.runtime}MIN.</div>
    <div>Rating:{movie?.vote_average} Star</div>
  </div>


  <div className='pt-14 space-y-2 pr-4'>
<div>OVERVIEW</div>
<div>{movie?.overview}</div>
  </div>

<div className='inline-block flex gap-2 items-center justify-evenly pt-6 cursor-pointer' >
<div className='flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-[#b4b4b4]' onClick={startplayer}>
  <BsPlayFill size={24}/>
   Watch Trailer
            </div>
            <div className='flex  items-center justify-center px-2 py-2 mb-6 bg-white hover:bg-[#b4b4b4] text-black' onClick={()=>addmovie(movie)}>
            
<MdFileDownloadDone  size={24} color={"black"}/>
Add Movie

            </div>
          </div>
         </div>
       </div>
      </div>
     


   <div className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 
   ${showplayer ? "opacity-100 z-50" : "opacity-0 -z-10"}`}>
<div className='flex items-center justify-between bg-black text-[#f9f9f9] p-3.5'>
  <span className='font-semibold'>Playing Trailer</span>
  <div  onClick={()=>setShowplayer(false)} className='cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]'>
  <IoMdClose/>
  </div>
</div>

<div className='relative pt-[56.25%]'>
<ReactPlayer
url={trailer}
width="100%"
height="100%"
style={{position:"absolute",top:"0",left:"0"}}
controls={true}
playing={showplayer}
/>

</div>





   </div>



<div className='pb-20'>
<Footer/>
</div>

      </main>
    
    </>
  )


}

export default Moviedetails
