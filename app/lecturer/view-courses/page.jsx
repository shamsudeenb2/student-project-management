
import styles from '@/app/ui/student/lecturer-courses.module.css';
import ViewCourses from '@/app/component/ViewCourses';

export default function ViewCoursesPage() {
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Courses</h1>
        <p>Here is a list of courses you are lecturing.</p>
      </header>
      <main className={styles.main}>
        <table className={styles.courseTable}>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Students Enrolled</th>
            </tr>
          </thead>
          <ViewCourses />
        </table>
      </main>
    </div>
  );
}
