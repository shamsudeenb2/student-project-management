// import { updateUser } from "@/app/lib/actions";
// import { fetchUser } from "@/app/lib/data";
import styles from "@/app/ui/admin/student/singlePage/singlePage.module.css";
import Image from "next/image";

const SingleStudentPage = async ({ params }) => {
  
  const { id } = params;
//   const user = await fetchUser(id);

  return (
    <div className={styles.container}>
      {/* <div className={styles.infoContainer}> */}
        {/* <div className={styles.imgContainer}>
          <Image src={ "/noavatar.png"} alt="" fill />
        </div>user name */}
        {/* {user.username} */}
      {/* </div> */}
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="hidden" name="id" value=""/>
          <div>
          <label>Name</label>
          <input type="text" placeholder="" name="name" required />
          </div>
          <div>
          <label>Username</label>
          <input type="text" name="username" placeholder="" />
          </div>
          <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="" />
          </div>
          <div>
          <label>Password</label>
          <input type="password" name="password" />
          </div>
          <div>
          <label>Phone</label>
          <input type="text" name="phone" placeholder="" />
          </div>
          <div>
          <label>State</label>
          <input type="text" placeholder="" name="state" required />
          </div>
          
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleStudentPage;
