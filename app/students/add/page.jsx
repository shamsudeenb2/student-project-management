'use client'

import { useState } from "react";
// import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
import CourseInputForm from "@/app/ui/student/registerCourseForm"

const AddStaffPage = () => {


  const [inputs, setInputs] = useState({
    course_name: "",
    course_code: "",
    credit_unit: ""
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
                course_name: "",
                course_code: "",
                credit_unit: ""
              });
            } else {
              alert("Something went wrong!");
            }
          };
  return (
    <div className={styles.container}>
      <CourseInputForm/>
      {/* <form action=" " className={styles.form}>
        <input type="text" placeholder="course name" name="course_name" onChange={ handleOnChange} required />
        <input type="text" placeholder="course code" name="course_code" onChange={ handleOnChange} required />
        <input type="text" placeholder="credit unit" name="credit_unit" onChange={ handleOnChange} required /> */}
        
        {/* <select name="gender" id="gender">
          <option value={'male'}>
            gender
          </option>
          <option value={'male'}>male</option>
          <option value={'female'}>female</option> */}
        {/* </select> */}
        {/* <button  onClick={handleSaveData} type="submit" >Submit</button>
      </form> */}
    </div>
  );
};

export default AddStaffPage;
