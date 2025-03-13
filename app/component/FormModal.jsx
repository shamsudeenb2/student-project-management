"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import styles from '@/app/ui/modalform.module.css';
// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

// const VendorForm = dynamic(() => import("./forms/VendorForm"), {
//   loading: () => <h1>Loading...</h1>,
// });
// const StationForm = dynamic(() => import("./forms/StationForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const UserForm = dynamic(() => import("./forms/UserForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const TruckForm = dynamic(() => import("./forms/TruckForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const TruckListForm = dynamic(() => import("./forms/TruckListForm"), {
//   loading: () => <h1>Loading...</h1>,
// });

// const forms = {
//   vendor: (type, data, setOpen,setUpdateState) => <VendorForm type={type} dataItem={data} setOpen={setOpen} setUpdateState={setUpdateState}/>,
//   station: (type, data, setOpen,setUpdateState) => <StationForm type={type} dataItem={data} setOpen={setOpen} setUpdateState={setUpdateState}/>,
//   user: (type, data, setOpen,setUpdateState) => <UserForm type={type} dataItem={data} setOpen={setOpen} setUpdateState={setUpdateState}/>,
//   truck: (type, data, setOpen,setUpdateState) => <TruckForm type={type} dataItem={data} setOpen={setOpen} setUpdateState={setUpdateState}/>,
//   trucklist: (type, data, setOpen,setUpdateState) => <TruckListForm type={type} dataItem={data} setOpen={setOpen} setUpdateState={setUpdateState}/>
// };

const FormModal = ({
  table,
  type,
  setUpdateState,
  data,
  id,
 deleteItem,
 message
}) => {
//   const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
//   const bgColor =
//     type === "create"
//       ? "bg-lamaYellow"
//       : type === "update"
//       ? "bg-lamaSky"
//       : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return  (
      <div  className={styles.modalForm}>
        <span className={styles.madalSpan}>
           {message}?
        </span>
        <button  onClick={()=>deleteItem(id)}className={styles.modalBottom}>
          Remove
        </button>
      </div>
    ) 
    // : type === "create" || type === "update" ? (
    //   forms[table](type, data,setOpen,setUpdateState)
    // ) : (
    //   "Form not found!"
    // );
  };

  return (
    <>
      <button
        className={styles.buttonOpenModal}
        onClick={() => setOpen(true)}
      >
        Remove
      </button>
      {open && (
        <div className={styles.modalOpen}>
          <div className={styles.modalBody}>
            <Form />
            <div
              className={styles.modalClose}
              onClick={() => setOpen(false)}
            >
              Close
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
