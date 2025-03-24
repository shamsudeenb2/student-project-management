
import styles from "@/app/ui/admin/student/singlePage/singlePage.module.css";
import Image from "next/image";
import AssignForm from "@/app/ui/admin/assignForm/assignForm"

const SingleRoutePage = async ({ params }) => {
  const { id } = params;
  const {users} = await fetch('http://localhost:3000//api/actions/postUser').then((res) =>
    res.json()
  )
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>Assign project supervisors to student</p>
      </header>
      {/* <div className={styles.infoContainer}> */}
        {/* <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {route.title} */}
      {/* </div> */}
        <AssignForm users={JSON.stringify(users)} uId={id}/>
    </div>
  );
};

export default SingleRoutePage;
