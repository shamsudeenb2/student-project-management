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
        const response = await fetch(`http://localhost:3000//api/actions/postUser?id=${uId}`, {
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
          alert("Data saved successfully!");
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
          const response = await fetch(`/api/actions/postUser/${uId}?role=staff`)
          setsupervisorLoading(false)
          if(response.error){
              return setStaffUserError(response.error)
          }
          const data = await response.json();
          console.log("user with supervisor", data.user)
          setsupervisor(data.user)
    }
    getstaffUser()
},[updateSupervisor])
    
  console.log("users staff name then", supervisor?.supervisor)
    return(
       
            <main className={styles.main}>
                <div className={styles.studentInfo}>
                    <h2>Supervisor Details</h2>
                    <p><strong>Name:</strong> {supervisor?.supervisor?.name}</p>
                    <p><strong>Email:</strong> {supervisor?.supervisor?.email}</p>
                    <p><strong>Program:</strong> {supervisor?.supervisor?.program}</p>
                    <p><strong>Current Student Name:</strong> {supervisor.name}</p>
                </div>
                <div className={styles.supervisorSelection}>
                    <form  className={styles.form}>
                        <label htmlFor="supervisor">Change Supervisor:</label>
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



// 'use client';

// import { useState } from 'react';
// import styles from '@/app/ui/admin/student/singlePage/manageSupervisor.module.css';

// export default function UpdateForm() {
//   const [student, setStudent] = useState({
//     id: 1,
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     program: 'Computer Science',
//     supervisor: { id: 101, name: 'Dr. Smith' },
//   });

//   const [supervisors, setSupervisors] = useState([
//     { id: 101, name: 'Dr. Smith' },
//     { id: 102, name: 'Dr. Johnson' },
//     { id: 103, name: 'Dr. Williams' },
//     { id: 104, name: 'Dr. Brown' },
//   ]);

//   const handleSupervisorChange = (event) => {
//     const newSupervisor = supervisors.find(s => s.id === parseInt(event.target.value));
//     setStudent(prevState => ({ ...prevState, supervisor: newSupervisor }));
//   };

//   return (

//   );
// }
