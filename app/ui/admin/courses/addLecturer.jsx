"use client";

import {useState, useEffect, React} from "react";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/ui/student/register.module.css";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const AddLecturer=({ uId})=>{
    const [selectId, setSelectId] = useState("")
    const router = useRouter()
    const {data: session} = useSession()

    const [staffUser, setStaffUser] = useState([])
    const [staffUserLoading, setLoadingstaffUser] = useState(false)
    const [staffUserError, setStaffUserError] = useState(null)
  

    const handleSaveData = async (e) => {
        e.preventDefault();
        console.log('submit', selectId);
        const response = await fetch(`http://localhost:3000//api/actions/coursePost?id=${uId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectId), // Wrap in an object with a 'data' key
        });
      
        if (response.ok) {
          alert("Lecturer added!");
          setSelectId("");
          router.push("/admin/Student");
        } else {
          alert("Something went wrong!");
        }
      };
  
      

    console.log("user export", uId)

    const handleSearch = (e) => {
      
      if (e.target.value) {
        setSelectId(e.target.value);
      } ;
    };
    

    useEffect(()=>{
      const getstaffUser= async()=>{
          setLoadingstaffUser(true)
          setStaffUserError(null)
        
          const response = await fetch(`/api/charts/userChat?id=staff`)
              setLoadingstaffUser(false)
          if(response.error){
              return setStaffUserError(response.error)
          }
          const data = await response.json();
          setStaffUser(data.users)
      }
      getstaffUser()
  },[])
    
  console.log("users staff name then", staffUser)
    return(
        <form  className={styles.form}>
        {staffUserLoading && <tr>Loading  ...</tr>}
        <select  className={styles.select}id="user" onChange={handleSearch}>
        <option value="">Select</option>
        {staffUser.filter((sta)=>{
          return sta.role==="staff"
        }).map((state) => {
          return (
              <option key={state._id} value={state._id}>{state.name}</option>
             );
            })}
           </select>
          <button onClick={handleSaveData}>add Lecturer</button>
        </form>
    )
}

export default AddLecturer