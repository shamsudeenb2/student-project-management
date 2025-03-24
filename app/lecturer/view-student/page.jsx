
import styles from '@/app/ui/student/project-student.module.css';
import ViewStudents from '@/app/component/ViewProjectStudent';

export default function ViewStudentsPage() {
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Integrative Communication Platform for supervisor and Supervisee Interaction</h1>
        <p>Here is a list of students you are supervising.</p>
      </header>
      <main className={styles.main}>
        <table className={styles.studentTable}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Program</th>
            </tr>
          </thead>
          <ViewStudents/>
        </table>
      </main>
    </div>
  );
}