import Link from 'next/link';
import styles from '@/app/ui/admin/student/lecturer.module.css';
import { FaBook, FaUserGraduate, FaComments, FaFileUpload } from 'react-icons/fa';
import ProtectedRoute from "../ProtectedRoute";
import { getSession } from "@/app/configuration/auth"

const LecturerDashboard= async () =>{
  const  session = await getSession()
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>Lecturer Dashboard.</p>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <Link href="/lecturer/view-courses" className={styles.card}>
            <div className={styles.icon}><FaBook size={40} /></div>
            <h2>View Courses</h2>
            <p>Check the courses you are teaching.</p>
          </Link>
          <Link href="/lecturer/view-student" className={styles.card}>
            <div className={styles.icon}><FaUserGraduate size={40} /></div>
            <h2>View Students</h2>
            <p>See the list of students under your supervision.</p>
          </Link>
          <Link href={`/students/${session?.user?.id}/chat`} className={styles.card}>
            <div className={styles.icon}><FaComments size={40} /></div>
            <h2>Chat with Students</h2>
            <p>Communicate with your supervisees.</p>
          </Link>
          <Link href={`/students/${session?.user?.id}/files`} className={styles.card}>
            <div className={styles.icon}><FaFileUpload size={40} /></div>
            <h2>Share Files</h2>
            <p>Upload and share documents with your students.</p>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AFIT Lecturer Portal</p>
      </footer>
    </div>
  );
}

const TestProtected = () => (
    <ProtectedRoute allowedRoles={['staff']}>
      <LecturerDashboard />
    </ProtectedRoute>
  );
  
  export default TestProtected;