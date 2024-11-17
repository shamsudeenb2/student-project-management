'use client'
import styles from "@/app/ui/admin/student/student.module.css";
import {useState, useEffect, useCallback} from "react"
import Image from "next/image";
import Link from "next/link";

const FetchCourses = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const [courses, setCourses] = useState([])
  const [coursesLoading, setLoadingCourses] = useState(false)
  const [coursesError, setCoursesError] = useState(null)

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/actions/coursePost?id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('deleteSupabaseItem - ResponseOK - data deleted',);
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
    const getCourses= async()=>{
        setLoadingCourses(true)
        setCoursesError(null)
      
        const response = await fetch('/api/actions/coursePost')
            setLoadingCourses(false)
        if(response.error){
            return setCoursesError(response.error)
        }
        const data = await response.json();
        setCourses(data)
    }
    getCourses()
},[])
console.log('courses', courses)
  return (
        <tbody>
          {coursesLoading && <tr>Loading  ...</tr>}
          {courses?.courses?.map((course) => ( 
            <tr key={course.id}>
              <td>{course.course_name}</td>
              <td>{course.course_code}</td>
              <td>{course.credit_unit}</td>
              <td>{course.facaulty}</td>
              <td>{course.department}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/Staff/${course._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      add lecturer
                    </button>
                  </Link>
                  <form action="">
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.delete}`} onClick={()=>deleteUser(course._id)}>
                      Delete 
                    </button>
                  </form>
                </div>
              </td>
            </tr>
           ))}
        </tbody>
     );
  };

export default FetchCourses;
