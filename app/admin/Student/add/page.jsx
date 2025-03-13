// import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
import InputForm from "@/app/ui/admin/student/inputForm";

const AddStudentPage = () => {


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Users</h1>
        <p>Create both staff and student users efficiently</p>
      </header>
      <InputForm/>
    </div>
  );
};

export default AddStudentPage;
