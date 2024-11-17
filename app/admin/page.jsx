import Image from "next/image";
import Link from "next/link";
import styles from "../ui/admin/adminHome.module.css"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import ProtectedRoute from "../ProtectedRoute";

const AdminHome = async () => {

  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.cardContainer}>
            <Link href="/admin/Student">
              <div className={styles.cards}>
                 <p>Users</p>
              </div>
              </Link>
              <Link href="/admin/Staff">
              <div className={styles.cards}>
                 <p>Course</p>
              </div>
              </Link>
              {/* <div className={styles.cards}>
                <p>Assign Superversor</p>
              </div> */}
            </div>
        </div>
    </div>
  );
};

// const TestProtected = () => (
//   <ProtectedRoute allowedRoles={['admin']}>
//     <AdminHome />
//   </ProtectedRoute>
// );

export default AdminHome;
