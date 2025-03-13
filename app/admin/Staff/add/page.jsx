// import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
import CourseInputForm from "@/app/ui/admin/student/courseInputForm";

const AddCoursePage = () => {

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      <h1>Create Course</h1>
        <p>Create course here.</p>
      </header>
      <CourseInputForm/>
    </div>
  );
};

export default AddCoursePage;
