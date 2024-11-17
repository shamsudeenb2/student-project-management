// import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
import CourseInputForm from "@/app/ui/admin/student/courseInputForm";

const AddCoursePage = () => {

  return (
    <div className={styles.container}>
      <CourseInputForm/>
    </div>
  );
};

export default AddCoursePage;
