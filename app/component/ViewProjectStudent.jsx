'use client';

import {useState, useEffect, useCallback} from "react"
import styles from '@/app/ui/student/lecturer-courses.module.css';
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


export default function ViewStudents() {
     const {data: session} = useSession()
      const [coursesLoading, setLoadingCourses] = useState(false)
      const [coursesError, setStudentsError] = useState(null)
      const [students, setStudents] = useState(null);
    
      const deleteCourse = async (id) => {
        try {
          const response = await fetch(`/api/actions/postUser?id=${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            console.log('deleteSupabaseItem - ResponseOK - data deleted',);
            router.push("/admin/Student");
          } else {
            // Handle the error
            console.log('deleteSupabaseItem - Response not OK');
          }
        } catch (error) {
          console.log('deleteSupabaseItem - try/catch error');
          console.error('deleteSupabaseItem - try/catch error - error', error);
        }
      };

    useEffect(()=>{
         const getcourses= async()=>{
            setLoadingCourses(true)
            setStudentsError(null)
            const response = await fetch(`http://localhost:3000//api/courses/view-student?id=${session?.user?.id}`)
                setLoadingCourses(false)
            if(response.error){
                return setStudentsError(response.error)
            }
            const data = await response.json();
            console.log('courses and user', data?.users?.courses)
            if(session?.user?.role==="staff"){
              console.log("staf response is", data?.users)
              setStudents(data?.users)
            }
    
            
        }
        getcourses()
       },[])

    
    return(
        <tbody>
        {students?.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.program}</td>
          </tr>
        ))}
      </tbody>
    )
}