// import Image from "next/image";
// import Link from "next/link";
import styles from "../ui/admin/adminHome.module.css"
// import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import ProtectedRoute from "../ProtectedRoute";

// const AdminHome = async () => {

//   return (
//     <div className={styles.container}>
//         <div className={styles.content}>
//             <div className={styles.cardContainer}>
//             <Link href="/admin/Student">
//               <div className={styles.cards}>
//                  <p>Users</p>
//               </div>
//               </Link>
//               <Link href="/admin/Staff">
//               <div className={styles.cards}>
//                  <p>Course</p>
//               </div>
//               </Link>
//               {/* <div className={styles.cards}>
//                 <p>Assign Superversor</p>
//               </div> */}
//             </div>
//         </div>
//     </div>
//   );
// };

import Link from 'next/link';
// import styles from '../styles/Admin.module.css';
import { FaUserPlus, FaBook,FaEye,FaUsers  } from 'react-icons/fa';

const AdminHome = async () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Manage users and courses efficiently</p>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
        <Link href="/admin/Student" className={styles.card}>
            <div className={styles.icon}><FaUsers   size={40} /></div>
            <h2>View Student</h2>
            <p>See the list of staff and student you created.</p>
          </Link>
          <Link href="/admin/lecturer" className={styles.card}>
            <div className={styles.icon}><FaUsers   size={40} /></div>
            <h2>View Lecturer</h2>
            <p>See the list of staff and student you created.</p>
          </Link>
          <Link href="/admin/Student/add" className={styles.card}>
            <div className={styles.icon}><FaUserPlus size={40} /></div>
            <h2>Create Users</h2>
            <p>Add new staff or students to the system.</p>
          </Link>
          <Link href="/admin/Staff" className={styles.card}>
            <div className={styles.icon}><FaEye size={40} /></div>
            <h2>View Registered Courses</h2>
            <p>Check your registered courses and schedule.</p>
          </Link>
          <Link href="/admin/Staff/add" className={styles.card}>
            <div className={styles.icon}><FaBook size={40} /></div>
            <h2>Create Courses</h2>
            <p>Add and manage courses offered in the institution.</p>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AFIT Admin Panel</p>
      </footer>
    </div>
  );
}

const TestProtected = () => (
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminHome />
  </ProtectedRoute>
);

export default TestProtected;
