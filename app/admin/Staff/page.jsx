// import { deleteUser } from "@/app/lib/actions";
// import { fetchUsers } from "@/app/lib/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
import styles from "../../ui/admin/student/student.module.css";
import Image from "next/image";
import FetchCourses from "@/app/ui/admin/courses/fetchCourses";
import Link from "next/link";
import Search from "@/app/ui/search/search";

const CoursePage = async ({ searchParams }) => {
//   const q = searchParams?.q || "";
//   const page = searchParams?.page || 1;
//   const {count, users } = await fetchUsers(q, page);
const courses = await fetch('http://localhost:3000//api/actions/coursePost').then((res) =>
  res.json()
)

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/admin/Staff/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Course Title</td>
            <td>Course Code</td>
            <td>Cridit unit</td>
            <td>Facaulty</td>
            <td>Department</td>
            <td>Action</td>
          </tr>
        </thead>
          <FetchCourses />
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default CoursePage;
