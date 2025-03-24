import styles from "../../ui/admin/student/student.module.css";
import Image from "next/image";
import FetchCourses from "@/app/ui/admin/courses/fetchCourses";
import Link from "next/link";
import Search from "@/app/ui/search/search";

const CoursePage = async ({ searchParams }) => {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>View and Manage courses</p>
      </header>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
      </div>
      <main className={styles.main}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Course Code</td>
            <td>Course Title</td>
            <td>Cridit unit</td>
            <td>Facaulty</td>
            <td>Department</td>
            <td>Action</td>
          </tr>
        </thead>
          <FetchCourses />
      </table>
      </main>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default CoursePage;
