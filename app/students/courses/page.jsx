// import { deleteUser } from "@/app/utils/actions";
import { fetchUsers } from "@/app/utils/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/admin/student/student.module.css";
import Image from "next/image";
import Link from "next/link";
import FetchStudent from "@/app/ui/student/studentFetchForm";
import Search from "@/app/ui/search/search";
import { getServerSession } from "next-auth/next"

// import ProtectedRoute from "../ProtectedRoute";

const StudentPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Courses</h1>
        <p>Here is a list of courses you register.</p>
      </header>
      {/* <div className={styles.top}>
        <Search />
        <Link href="/students/add">
          <button className={styles.addButton}>Register course</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>course name</td>
            <td>course name</td>
            <td>credit unit</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody> */}
          <FetchStudent/>
        {/* </tbody>
      </table> */}
     {/* <Pagination count={count} />  */}
    </div>
  );
};
// const TestProtected = () => (
//   <ProtectedRoute allowedRoles={['admin']}>
//     <StudentPage />
//   </ProtectedRoute>
// );

export default StudentPage;
