import {useState} from "react"
import CardSkeleton from "../components/cardskeleton"
import Link from "next/link";
import { BASE_IMG_URL } from "../utils/const";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { MdFileDownloadDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import { add } from "../Redux/movieslice";
interface propsType{
    img:string;
    id:string;
    title:string;
    release_Date:string;
    movie:any
}





const Card = ({img,id,title,release_Date,movie}:propsType) => {
  const dispatch=useDispatch();



  const addmovie=(movie)=>{
         dispatch(add(movie))
  }




  console.log(movie)
    const [loaded,setLoaded]=useState(false);
    const [error,setError]=useState(false);
  return (
    <>
      <div className="group bg-primary h-[450px] md:h-[335px] w-[100%]">
   
        {!loaded && !error && <CardSkeleton/> }
        {
            error && <CardSkeleton error /> 
        }
<Link href={`/details/${id}`} className={`${!loaded && error && "hidden"}`}>

<div className="relative group-hover:scale-90 ">
   
 <img src={`${BASE_IMG_URL}${img}`} 

 className="object-cover h-[450px] md:h-[335px] w-[100%]" 
 alt="movie poster" 
 onLoad={()=>setLoaded(true)} 
 onError={()=>setError(true)}
 />
    
 <div className="absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
    {title}
    <p>{release_Date}</p>
 </div>
</div>




</Link>




      </div>
    </>
  )
}

export default Card
