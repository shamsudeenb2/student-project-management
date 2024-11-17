// import { deleteUser } from "@/app/utils/actions";
import { fetchUsers } from "@/app/utils/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/admin/student/student.module.css";
import Image from "next/image";
import Link from "next/link";
// import ProtectedRoute from "../ProtectedRoute";

const StaffPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const courses = await fetch('http://localhost:3000//api/actions/coursePost').then((res) =>
    res.json()
  )
  console.log('data', courses.courses)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <input placeholder="Search for a user..." />
        <Link href="/students/add">
          <button className={styles.addButton}>Add New</button>
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
        <tbody>
          {courses.courses?.map((item) => (
            <tr key={item.id} >
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {item.course_name}
                </div>
              </td>
              <td>{item.course_code}</td>
              <td>{item.credit_unit}</td>
              
              <td>
                <div className={styles.buttons}>
                
                    <button className={`${styles.button} ${styles.view}`}>
                      <span>Pending</span>
                    </button>
            
                  <Link href={`/students/${item._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      view courses
                    </button>
                  </Link>
                  <form action="">
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {/* <Pagination count={count} />  */}
    </div>
  );
};
// const TestProtected = () => (
//   <ProtectedRoute allowedRoles={['staff']}>
//     <StaffPage />
//   </ProtectedRoute>
// );

export default StaffPage;
