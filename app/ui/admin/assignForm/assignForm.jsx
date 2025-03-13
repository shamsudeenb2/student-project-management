"use client";

import {useState, useEffect, React} from "react";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/ui/admin/student/singlePage/singlePage.module.css";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


const AssignForm=({users, uId})=>{
    const [selectId, setSelectId] = useState("")
    const router = useRouter()

    const [staffUser, setStaffUser] = useState([])
    const [staffUserLoading, setLoadingstaffUser] = useState(false)
    const [staffUserError, setStaffUserError] = useState(null)
  

    const handleSaveData = async (e) => {
        e.preventDefault();
        console.log('submit', selectId);
        const response = await fetch(`http://localhost:3000//api/actions/postUser?id=${uId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectId), // Wrap in an object with a 'data' key
        });
      
        if (response.ok) {
          alert("Data saved successfully!");
          setSelectId("");
          router.push("/admin/Student");
        } else {
          alert("Something went wrong!");
        }
      };
  
      

    console.log("user export", uId)

    const handleSearch = (e) => {
      
      if (e.target.value) {
        // const selected = JSON.parse(e.target.value);
        console.log('selected',e.target.value)
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
          <button onClick={handleSaveData}>Assign</button>
        </form>
    )
}

export default AssignForm