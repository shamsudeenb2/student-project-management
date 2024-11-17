'use client'
import { useState } from "react";
import styles from "./addStudent/addstudent.module.css";
import { useRouter } from 'next/navigation'


const  CourseInputForm=()=>{
  const router = useRouter()
  const [inputs, setInputs] = useState({
    course_name:"",
    course_code:"",
    credit_unit:"",
    facaulty:"",
    department:""
  });
        const handleOnChange = (evt) => {
          const { name, value } = evt.target;
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        };  
          const handleSaveData = async (e) => {
            e.preventDefault();
            console.log('submit', inputs);
            const response = await fetch('http://localhost:3000//api/actions/coursePost', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(inputs), // Wrap in an object with a 'data' key
            });
          
            if (response.ok) {
              alert("Data saved successfully!");
              setInputs({
                course_name:"",
                course_code:"",
                credit_unit:"",
                facaulty:"",
                department:""
              });
              router.push("/admin/Staff");
            } else {
              alert("Something went wrong!");
            }
          };
      
    return(
        <div>
        <form action=" " className={styles.form}>
        <input type="text" placeholder=" Course name" value={inputs.course_name} name="course_name" onChange={ handleOnChange} required />
        <input type="text" placeholder="Course Code" name="course_code" value={inputs.course_code} onChange={ handleOnChange} required />
        <input type="text" placeholder="Credit unit" name="credit_unit" value={inputs.credit_unit} onChange={ handleOnChange} required />
        <input type="text" placeholder="Faculty" name="facaulty" value={inputs.facaulty} onChange={ handleOnChange} />
        <input type="text" placeholder=" Department" name="department" value={inputs.department} onChange={ handleOnChange}  required />
        <button type="submit" onClick={handleSaveData}>Submit</button>
      </form>
      </div>
    )
}
export default CourseInputForm;