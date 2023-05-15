import React ,{useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { apiFill } from '../API/Api';
import { fillTextSelector } from '../redux/slice';

export const SampleFilltext = () => {
    const dispatch = useDispatch()
  
    const {fillText} = useSelector(fillTextSelector)
 
    useEffect(() => {
        // dispatch(apiFill());     
    }, [])
    let value=fillText ;
    // console.log("dghlhjmfh",value.data  ); 
  return (
    <div>
      {/* Sample Dev */}
      {
        value.data?.map((val)=>{
          console.log(val);
          return <>
          <li style={{listStyle:"none"}} key={val}>{val.username}</li>
          </>
        })
      }
    </div>
  )
}
export default SampleFilltext;
