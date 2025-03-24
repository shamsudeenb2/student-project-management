// import { deleteUser } from "@/app/utils/actions";
import { fetchUsers } from "../../utils/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
import styles from "../../ui/admin/student/student.module.css";
import Search from "@/app/ui/search/search";
import Image from "next/image";
import Link from "next/link";
import FetchUser from "@/app/ui/admin/student/fetchUsers";
// import deleteUser from "@/app/component/deleteUser"
import {getSession} from "@/app/configuration/auth"


const StudentPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const users = await fetch('http://localhost:3000//api/actions/postUser').then((res) =>
  //   res.json()
  // )

  const session = await getSession()
  console.log("session lecturer page page", session )

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/actions/postUser?id=${id}`, {
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
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction </h1>
        <p>View and Manage Lecturers</p>
      </header>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
      </div>
      <main className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>username</td>
            <td>Name</td>
            <td>Reg Number</td>
            <td>Email</td>
            <td>Phone</td>
            <td>State</td>
            <td>Role</td>
            <td>Program</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
         <FetchUser role="staff"/>
        </tbody>
      </table>
      </main>
     {/* <Pagination count={count} />  */}
    </div>
  );
};

export default StudentPage;
