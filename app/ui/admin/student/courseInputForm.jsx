'use client'
import { useState } from "react";
import styles from "./addStudent/addstudent.module.css";
import { useRouter } from 'next/navigation'
import InputField from "@/app/component/InputForm";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";


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
        <div className={styles.formContainer}>
        <form action=" " className={styles.form}>
        <div className={styles.formCouse}>
          <InputField
           type="text"
           label="Course name"
           name="course_name"
           handleOnChange={handleOnChange}
           required
           value={inputs.course_name}
          />
          <InputField
           type="text"
           label="Course code"
           name="course_code"
           handleOnChange={handleOnChange}
           required
           value={inputs.course_code}
          />
          <InputField
           label="Credit unit"
           name="credit_unit"
           handleOnChange={handleOnChange}
           required
           value={inputs.credit_unit}
          />
          <InputField
           label="Facaulty"
           name="facaulty"
           handleOnChange={handleOnChange}
           required
           value={inputs.facaulty}
          />
          <InputField
           type="text"
           label="Department"
           name="department"
           handleOnChange={handleOnChange}
           required
           value={inputs.department}
          />
        </div>
        <button type="submit" onClick={handleSaveData}>Submit</button>
      </form>
      </div>
    )
}
export default CourseInputForm;