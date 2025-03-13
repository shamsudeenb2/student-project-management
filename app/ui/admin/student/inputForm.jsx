'use client';
import { useState } from "react";
import styles from "./addStudent/addstudent.module.css";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import InputField from "@/app/component/InputForm";
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const  InputForm=()=>{
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    personalNo: "",
    state: "",
    program: "",
    role: "",
  });
  const [file, setFile] = useState(null)
  const router = useRouter()

  const handleFileChange = (e) => {
    console.log("file value",e.target.files[0])
    setFile(e.target.files[0]);
  };
  
        const handleOnChange = (evt) => {
          const { name, value } = evt.target;
          setInputs((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        };  
        

          const handleSaveData = async (e) => {
            e.preventDefault();

            if (!file) return;
            const formData = new FormData();

             for (const input in inputs){
              formData.append(input, inputs[input])
              console.log("inside looop",inputs[input])
             }
             formData.append("img", file)

            console.log('submitting formData', formData.get("img"));
            const response = await fetch('http://localhost:3000//api/actions/postUser', {
              method: "POST",
              // headers: {
              //   "Content-Type": "application/json",
              // },
              body: formData
              // body: JSON.stringify(inputs), // Wrap in an object with a 'data' key
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
                program: "",
                role: "",
              });
              router.push("/admin/Student");
            } else {
              alert("Something went wrong!");
            }
          };
      
    return(
        <div className={styles.formContainer}>
        <form action=" " className={styles.form}>
         <div className={styles.formInput}>
          <InputField
           type="text"
           label="Name"
           name="name"
           handleOnChange={handleOnChange}
           required
           value={inputs.name}
          />
          <InputField
           type="text"
           label="Username"
           name="username"
           handleOnChange={handleOnChange}
           required
           value={inputs.username}
          />
          <InputField
           type="email"
           label="Email"
           name="email"
           handleOnChange={handleOnChange}
           required
           value={inputs.email}
          />
          <InputField
           type="phone"
           label="Phone"
           name="phone"
           handleOnChange={handleOnChange}
           required
           value={inputs.phone}
          />
          <InputField
           type="password"
           label="Password"
           name="password"
           handleOnChange={handleOnChange}
           required
           value={inputs.password}
          />
          <InputField
           type="text"
           label="Registration Number"
           name="personalNo"
           handleOnChange={handleOnChange}
           required
           value={inputs.personalNo}
          />
          <InputField
           type="text"
           label="State"
           name="state"
           handleOnChange={handleOnChange}
           required
           value={inputs.state}
          />
          <InputField
           type="text"
           label="program"
           name="program"
           handleOnChange={handleOnChange}
           required
           value={inputs.program}
          />
          {/* <input type="email" placeholder="email" name="email" value={inputs.email} onChange={ handleOnChange} required /> */}
         {/* <input type="phone" placeholder="phone" name="phone" value={inputs.phone} onChange={ handleOnChange} /> */}
        {/* <input type="password" placeholder="password" name="password" value={inputs.password} onChange={ handleOnChange}  required/>
        <input type="text" placeholder="Registration number" name="personalNo" value={inputs.personalNo} onChange={ handleOnChange}  required /> */}
        {/* <input type="text" placeholder="state" name="state" value={inputs.state} onChange={ handleOnChange}  required /> */}
        {/* <input type="text" placeholder="Date of Birth" name="dob" value={inputs.dob} onChange={ handleOnChange}  /> */}
        {/* <input type="text" placeholder="program" name="program"  value={inputs.program} onChange={ handleOnChange} /> */}

        <div className={styles.feildsInput}>
        <label >User Role</label>
        <select name="role" id="role" value={inputs.role} onChange={ handleOnChange}  className={styles.inputField}>
          <option value={'student'}>student </option>
          <option value={'staff'}> staff </option>
        </select>
        </div>
        <div className={styles.imageUpload}>
          <label
            className={styles.imageLabel}
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input type="file" accept=".svg,.png,.jpeg," id="img" name="img" value={inputs.img} onChange={handleFileChange} className={styles.imageInput} />
        </div>
         </div>
        <button type="submit" onClick={handleSaveData}>Submit</button>
      </form>
      </div>
    )
}
export default InputForm;