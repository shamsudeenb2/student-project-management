import styles from '@/app/ui/admin/student/singlePage/manageSupervisor.module.css';
import Image from "next/image";
import UpdateForm from "@/app/ui/admin/assignForm/updateSupervisor"

const SingleRoutePage = async ({ params }) => {
  const { id } = params;
  const {users} = await fetch('http://localhost:3000//api/actions/postUser').then((res) =>
    res.json()
  )
  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <h1>Manage Student Supervisor</h1>
          <p>View and update the supervisor assigned to a student.</p>
      </header>
      {/* <div className={styles.infoContainer}> */}
        {/* <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {route.title} */}
      {/* </div> */}
        <UpdateForm users={JSON.stringify(users)} uId={id} label="update"/>
    </div>
  );
};

export default SingleRoutePage;
