'use client';
import { useState } from "react";
import styles from "./addStudent/addstudent.module.css";
import { useRouter } from 'next/navigation';

const  InputForm=()=>{
  ;
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    personalNo: "",
    state: "",
    // dob: "",
    program: "",
    role: "",
  });
  const router = useRouter()
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
            const response = await fetch('http://localhost:3000//api/actions/postUser', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(inputs), // Wrap in an object with a 'data' key
            });
          
            if (response.ok) {
              alert("Data saved successfully!");
              setInputs({
                name: "",
                username: "",
                email: "",
                phone: "",
                password: "",
                personalNo: "",
                state: "",
                // dob: "",
                program: "",
                role: "",
              });
              router.push("/admin/Student");
            } else {
              alert("Something went wrong!");
            }
          };
      
    return(
        <div>
        <form action=" " className={styles.form}>
        <input type="text" placeholder="name" value={inputs.name} name="name" onChange={ handleOnChange} required />
        <input type="text" placeholder="username" name="username" value={inputs.username} onChange={ handleOnChange} required />
        <input type="email" placeholder="email" name="email" value={inputs.email} onChange={ handleOnChange} required />
        <input type="phone" placeholder="phone" name="phone" value={inputs.phone} onChange={ handleOnChange} />
        <input type="password" placeholder="password" name="password" value={inputs.password} onChange={ handleOnChange}  required/>
        <input type="text" placeholder="Registration number" name="personalNo" value={inputs.personalNo} onChange={ handleOnChange}  required />
        <input type="text" placeholder="state" name="state" value={inputs.state} onChange={ handleOnChange}  required />
        {/* <input type="text" placeholder="Date of Birth" name="dob" value={inputs.dob} onChange={ handleOnChange}  /> */}
        <input type="text" placeholder="program" name="program"  value={inputs.program} onChange={ handleOnChange} />

        <select name="role" id="role" value={inputs.role} onChange={ handleOnChange} >
          <option value={'admin'}>role</option>
          <option value={'admin'}>admin </option>
          <option value={'student'}>student </option>
          <option value={'staff'}> staff </option>
        </select>
        
        <button type="submit" onClick={handleSaveData}>Submit</button>
      </form>
      </div>
    )
}
export default InputForm;