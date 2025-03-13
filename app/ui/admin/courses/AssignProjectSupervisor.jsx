"use client";

import {useState, useEffect, React} from "react";
import { MdSearch } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '@/app/ui/admin/student/singlePage/manageSupervisor.module.css';
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";
import FormModal from "@/app/component/FormModal";

const AssignProjectForm=({users, uId })=>{
    const [selectId, setSelectId] = useState("")
    const router = useRouter()

    const [staffUser, setStaffUser] = useState([])
    const [supervisor, setsupervisor] = useState([])
    const [updateSupervisor, setupdateSupervisor] = useState([])
    const [supervisorLoading, setsupervisorLoading] = useState([])
    const [staffUserLoading, setLoadingstaffUser] = useState(false)
    const [staffUserError, setStaffUserError] = useState(null)


    // const removeProject = async (id) => {
    //     console.log('vendor delete',id)
    //     try {
    //       const response = await fetch(`/api/actions/coursePost/${uId}?item=${id}`, {
    //         method: 'DELETE',
    //       });
      
    //       if (response.ok) {
    //         console.log('deleteSupabaseItem - ResponseOK - data deleted',);
    //         const data = await response.json();
    //         setupdateSupervisor(data.message)
    //         alart(data.message)

    //       } else {
    //         // Handle the error
    //         console.log('deleteSupabaseItem - Response not OK');
    //       }
    //     } catch (error) {
    //       console.log('deleteSupabaseItem - try/catch error');
    //       console.error('deleteSupabaseItem - try/catch error - error', error);
    //     }
    //   };
  

    const handleSaveData = async (e) => {
        e.preventDefault();
        console.log('submit', selectId);
        const response = await fetch(`/api/actions/coursePost/${uId}?role=project`, {
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
          alert("Lecturer assigned to project!");
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
          const response = await fetch(`/api/actions/coursePost/${uId}?role=project`)
          setsupervisorLoading(false)
          if(response.error){
              return setStaffUserError(response.error)
          }
          const data = await response.json();
          console.log("courses with project page", data?.course?.project_supervisors)
          setsupervisor(data.course)
    }
    getstaffUser()
},[updateSupervisor])
    

    return(
       
            <main className={styles.Projecmain}>
                
                {supervisor?.project_supervisors?.length > 0?(
                  <div className={styles.projectHeader}>
                    <h2>Lecturer's Details</h2>
                <div className={styles.projectItems}>
                 {supervisor?.project_supervisors.map((project)=>{
                 return(
                    <div className={styles.projectInfo}>
                        <p><strong>Name:</strong> {project?.name}</p>
                        <p><strong>Email:</strong> {project?.email}</p>
                        <p><strong>Program:</strong> {project?.program}</p>
                        <p><strong>Current Course Name:</strong> {supervisor.course_name}</p>
                      
                        {/* <button className={`${styles.button} ${styles.delete}`} onClick={()=>deleteUser(course._id)}>
                            Delete 
                         </button> */}
                          <FormModal table="Lecturer" id={project._id} message="Are you sure you want to delete this Lecturer"/>
                    </div>
                 )
                 })}
                </div>
               </div>
                ):(
                  <div className={styles.studentInfo}><h4>No Lecturer assigned to supervise Project yet ...</h4></div>
                )}
                {/* <div className={styles.studentInfo}>
                    <h2>Lecturer's Details</h2>
                    <p><strong>Name:</strong> {supervisor?.lecturer?.name}</p>
                    <p><strong>Email:</strong> {supervisor?.lecturer?.email}</p>
                    <p><strong>Program:</strong> {supervisor?.lecturer?.program}</p>
                    <p><strong>Current Course Name:</strong> {supervisor.course_name}</p>
                </div> */}
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
                        <button onClick={handleSaveData}>Submit</button>
                    </form>
                </div>
            </main>
    )
}

export default AssignProjectForm




