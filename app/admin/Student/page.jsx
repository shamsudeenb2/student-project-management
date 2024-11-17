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

const StudentPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  // const users = await fetch('http://localhost:3000//api/actions/postUser').then((res) =>
  //   res.json()
  // )

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
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/admin/Student/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
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
         <FetchUser/>
        </tbody>
      </table>
     {/* <Pagination count={count} />  */}
    </div>
  );
};

export default StudentPage;
