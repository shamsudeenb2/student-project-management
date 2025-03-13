import Link from 'next/link';
import styles from "@/app/ui/admin/student/studenDashbord.module.css";
import { FaBook, FaEye, FaComments, FaFileUpload } from 'react-icons/fa';
import ProtectedRoute from "../ProtectedRoute";
import { getSession } from "@/app/configuration/auth"

const StudentDashboard= async()=>{
  const  session = await getSession()
 
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Student Dashboard</h1>
        <p>Welcome! Manage your courses and interact with your supervisor.</p>
      </header>
      <main className={styles.main}>
        <div className={styles.cardContainer}>
          <Link href="/students/add" className={styles.card}>
            <div className={styles.icon}><FaBook size={40} /></div>
            <h2>Course Registration</h2>
            <p>Register for your courses easily.</p>
          </Link>
          <Link href="/students/courses" className={styles.card}>
            <div className={styles.icon}><FaEye size={40} /></div>
            <h2>View Registered Courses</h2>
            <p>Check your registered courses and schedule.</p>
          </Link>
          <Link href={`/students/${session?.user?.id}/chat`} className={styles.card}>
            <div className={styles.icon}><FaComments size={40} /></div>
            <h2>Chat with Supervisor</h2>
            <p>Discuss your project and seek guidance.</p>
          </Link>
          <Link href={`/students/${session?.user?.id}/files`}  className={styles.card}>
            <div className={styles.icon}><FaFileUpload size={40} /></div>
            <h2>Share Files</h2>
            <p>Upload and share documents with your supervisor.</p>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AFIT Student Portal</p>
      </footer>
    </div>
  );
}

const TestProtected = () => (
  <ProtectedRoute allowedRoles={['student']}>
    <StudentDashboard />
  </ProtectedRoute>
);

export default TestProtected;
