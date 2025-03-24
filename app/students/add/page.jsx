// import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/student/register.module.css";
import CourseInputForm from "@/app/ui/student/registerCourseForm"

const AddStaffPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Register Your Courses</h1>
        <p>You register your courses here.</p>
      </header>
        <CourseInputForm/>
    </div>
  );
};

export default AddStaffPage;
