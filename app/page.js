// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
import styles from './ui/home.module.css'

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>AFIT</title>
//         <meta name="description" content="AFIT Motto." />
//       </Head>

//       <main className={styles.main}>
//         <section className={styles.features}>
//           <Image src="/afitbuilding.jpg" 
//           alt="AFIT" objectFit="cover" 
//           width={500} height={500} 
//           style={{ width: '100%', 
//           height: 'auto' }} />
//           <div className={styles.hometext}>
//           <h1>Supervisor Project Management System</h1>
//           <p></p>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

import Image from 'next/image';
import Header from './ui/Header';


export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <Header />

      {/* About Section */}
      <section className={styles.section}>
        <h2>About AFIT</h2>
        <p>
          The Air Force Institute of Technology is a center for excellence in science, engineering, and aerospace technology, committed to advancing knowledge and innovation.
        </p>
      </section>

      {/* Programs Section */}
      <section id="programs" className={styles.programsSection}>
        <h2>Our Programs</h2>
        <div className={styles.programsGrid}>
          {["Aerospace Engineering", "Cyber Security", "Mechanical Engineering"].map((program, index) => (
            <div key={index} className={styles.programCard}>
              <h3>{program}</h3>
              <p>Explore our cutting-edge {program.toLowerCase()} program.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <h2>What Our Students Say</h2>
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <p>“AFIT has provided me with the skills to excel in aerospace technology.”</p>
            <h4>- John Doe</h4>
          </div>
          <div className={styles.testimonialCard}>
            <p>“A transformative learning experience with hands-on projects.”</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AFIT. All rights reserved.</p>
      </footer>
    </div>
  );
}
