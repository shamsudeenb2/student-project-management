'use client'
import styles from "@/app/ui/admin/student/student.module.css";
import {useState, useEffect, useCallback} from "react"
import Image from "next/image";
import Search from "@/app/ui/search/search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const FetchStudent = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {data: session} = useSession()
  const router = useRouter() 

  const [courses, setCourses] = useState([])
  const [coursesLoading, setLoadingCourses] = useState(false)
  const [coursesError, setCoursesError] = useState(null)

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
        setCoursesError(null)
        const response = await fetch(`http://localhost:3000//api/actions/registerCourse?id=${session?.user?.id}&role=${session?.user?.role}`)
            setLoadingCourses(false)
        if(response.error){
            return setCoursesError(response.error)
        }
        const data = await response.json();
        console.log('courses and user', data?.users?.courses)
        if(session?.user?.role==="staff"){
          console.log("staf response is", data?.users)
          setCourses(data?.users)
        }else setCourses(data?.users?.courses)

        
    }
    getcourses()
   },[])

  return (
        <>
        <div className={styles.top}>
        <Search placeholder={'search...'}/>
        </div>
        <main className={styles.main}>
        <table className={styles.table}>
        <thead>
          <tr>
            <td>course name</td>
            <td>course name</td>
            <td>credit unit</td>
            <td>Facaulty</td>
            <td>Department</td>
           
          </tr>
        </thead>
        <tbody>
        {coursesLoading && <tr>Loading  ...</tr>}
        {courses?.map((course) => ( 
            <tr key={course.id}>
              <td>{course.course_name}</td>
              <td>{course.course_code}</td>
              <td>{course.credit_unit}</td>
              <td>{course.facaulty}</td>
              <td>{course.department}</td>
              <td>
                <div className={styles.buttons}>
                  {/* <Link href={`//${course._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Edit Course
                    </button>
                  </Link> */}
                  {/* <form action="">
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.delete}`} onClick={()=>deleteUser(course._id)}>
                      Delete 
                    </button>
                  </form> */}
                 </div>
                </td>
              </tr>
             ))}
            </tbody>
         </table>
        </main>
     
       </>
     );
  };

export default FetchStudent;
