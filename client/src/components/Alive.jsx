import { useEffect } from "react"
import {publicRequest} from '../request'

export default function Alive(){

  useEffect(()=>{
     const pingServer = async()=> {
       try{
        await publicRequest.get('/ping')
        console.log("Server Pinged ")

       }catch(err){
        console.log("Failed to ping server", err)
       }
    }

    pingServer()
    
    const interval = setInterval(pingServer, 5 * 60 * 1000)
    
    return ()=> clearInterval(interval)
  },[])
  


  return null
}