"use client";

import {useState, useEffect, React} from "react";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '@/app/ui/admin/student/singlePage/manageSupervisor.module.css';
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


const UpdateForm=({users, uId })=>{
    const [selectId, setSelectId] = useState("")
    const router = useRouter()

    const [staffUser, setStaffUser] = useState([])
    const [supervisor, setsupervisor] = useState([])
    const [updateSupervisor, setupdateSupervisor] = useState([])
    const [supervisorLoading, setsupervisorLoading] = useState([])
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
          const data = await response.json();
          console.log("user submit new supervisor", data.user)
          setupdateSupervisor(data.user)
          alert("Lecturer Updated!");
          setSelectId("");
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

  useEffect(()=>{
    const getstaffUser= async()=>{
        setsupervisorLoading(true)
        setStaffUserError(null)
          const response = await fetch(`/api/actions/coursePost/${uId}?role=staff`)
          setsupervisorLoading(false)
          if(response.error){
              return setStaffUserError(response.error)
          }
          const data = await response.json();
          console.log("courses with Lecturer", data.course)
          setsupervisor(data.course)
    }
    getstaffUser()
},[updateSupervisor])
    
  console.log("users staff name then", supervisor?.supervisor)
    return(
       
            <main className={styles.main}>
                <div className={styles.studentInfo}>
                    <h2>Lecturer's Details</h2>
                    <p><strong>Name:</strong> {supervisor?.lecturer?.name}</p>
                    <p><strong>Email:</strong> {supervisor?.lecturer?.email}</p>
                    <p><strong>Program:</strong> {supervisor?.lecturer?.program}</p>
                    <p><strong>Current Course Name:</strong> {supervisor.course_name}</p>
                </div>
                <div className={styles.supervisorSelection}>
                    <form  className={styles.form}>
                        <label htmlFor="supervisor">Change Lecturer:</label>
                        <select  className={styles.select}id="user" onChange={handleSearch}>
                            <option value="">Select</option>
                            {staffUser?.filter((sta)=>{
                            return sta.role==="staff"
                                }).map((state) => {
                            return (
                                <option key={state._id} value={state._id}>{state.name}</option>
                                );
                                })}
                        </select>
                        <button onClick={handleSaveData}>Update</button>
                    </form>
                </div>
            </main>
    )
}

export default UpdateForm




