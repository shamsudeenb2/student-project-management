
import { useEffect, useState } from "react";

export const useFetchrecipientUser = (chat, user)=>{
    const [recipientUser,setRecipientUser] = useState(null)
    const [error, setError] = useState(null)



    const recipientId=chat?.members.find((id)=> id !==user?.id)
    console.log("recipient user id", recipientId)

    useEffect(()=>{
        const getUser = async()=>{
            if(!recipientId) return null

        const response= await fetch(`/api/charts/userChat/recipientUser?id=${recipientId}`)
        if(response.error){
            return setError(error)
        }
        const data = await response.json();
        console.log("sessiom recipientUser3", data)
        setRecipientUser(data)
        };
        getUser()
    },[recipientId])

    return {recipientUser}
}