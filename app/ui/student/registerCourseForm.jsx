'use client'
import { useState, useEffect } from "react";
import styles from "./register.module.css";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


const  CourseInputForm=()=>{
    const router = useRouter()  
    const {data: session} = useSession()
    const [courses, setCourses] = useState([])
    const [coursesLoading, setLoadingCourses] = useState(false)
    const [coursesError, setCoursesError] = useState(null)
    const [selectId, setSelectId] = useState("");

    const handleSearch = (e) => {
      
        if (e.target.value) {
        //   const selected = JSON.parse(e.target.value);
          console.log('selected', e.target.value)
          setSelectId(e.target.value);
        } ;
      };

        const handleSaveData = async (e) => {
            e.preventDefault();
            console.log('selected id and session', selectId, session?.user);

            const response = await fetch(`http://localhost:3000//api/actions/registerCourse?id=${session?.user?.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectId), // Wrap in an object with a 'data' key
            });
          
            if (response.ok) {
              const data = await response.json();
              
              console.log("course registration",data)
              alert(data.message);
              setSelectId("");
              router.push("/students");
            } else {
              alert("Something went wrong!");
            }
          };

          useEffect(()=>{
            const getcourses= async()=>{
                setLoadingCourses(true)
                setCoursesError(null)
                const response = await fetch('http://localhost:3000//api/actions/coursePost')
                    setLoadingCourses(false)
                if(response.error){
                    return setCoursesError(response.error)
                }
                const data = await response.json();
                setCourses(data)
            }
            getcourses()
        },[])

        console.log('courses show', session?.user?.id)
        // const coursesList = JSON.parse(courses.courses)
      
    return(
        <div>
            <form  className={styles.form}>
            {coursesLoading && <tr>Loading  ...</tr>}
                <select  className={styles.select} id="course" onChange={handleSearch}>
                    <option value="">Select</option>
                    {courses?.courses?.map((course) => {
                        return (
                          <option key={course._id} value={course._id}>{course.course_name}</option>
                        );
                        })}
                </select>
                <button onClick={handleSaveData}>Register</button>
            </form>
      </div>
    )
}
export default CourseInputForm;