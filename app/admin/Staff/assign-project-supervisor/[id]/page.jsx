// import { updateUser } from "@/app/lib/actions";
// import { fetchUser } from "@/app/lib/data";
import AssignProjectForm from "@/app/ui/admin/courses/AssignProjectSupervisor";
import styles from "@/app/ui/admin/student/addStudent/addstudent.module.css";
import Image from "next/image";

const AssignProjectPage = async ({ params }) => {
  
  const { id } = params;
//   const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Course Lecturer</h1>
        <p>View and update the lecturer assigned to a course</p>
      </header>
      <AssignProjectForm uId={id}/>
      {/* <div className={styles.infoContainer}> */}
        {/* <div className={styles.imgContainer}>
          <Image src={ "/noavatar.png"} alt="" fill />
        </div>user name */}
        {/* {user.username} */}
      {/* </div> */}
      {/* <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="hidden" name="id" value=""/>
          <label>Name</label>
          <input type="text" placeholder="" name="name" required />
          <label>Username</label>
          <input type="text" name="username" placeholder="" />
          <label>Email</label>
          <input type="email" name="email" placeholder="" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="" />
          <label>Personnel Number</label>
          <input type="text" placeholder="" name="personnelNo" required />
          <label>State</label>
          <input type="text" placeholder="" name="state" required />
          <label>Station</label>
          <input type="text" placeholder="" name="station" required />
          <button>Update</button>
        </form>
      </div> */}
    </div>
  );
};

export default AssignProjectPage;
