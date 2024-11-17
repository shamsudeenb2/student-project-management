import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ui/home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Air Force Institute of Technology</title>
        <meta name="description" content="AFIT Motto." />
      </Head>

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Air Force Institute of Technology</h1>
            
            
          </div>
          {/* <div className={styles.heroImage}>
            <Image src="/images/hero-image.jpg" alt="Postal Service" width={500} height={500} />
          </div> */}
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          {/* <h2>Why Choose Us?</h2>
          <div className={styles.featureList}>
            <div className={styles.feature}> */}
              <Image src="/afitbuilding.jpg" alt="AFIT" width={800} height={400} />
              {/* <h3>Fast Delivery</h3>
              <p>We ensure your packages are delivered quickly and securely.</p> */}
            {/* </div>
            <div className={styles.feature}> */}
              {/* <Image src="/afitConvocation.jpg" alt="Real-time Tracking" width={500} height={500} /> */}
              {/* <h3>Real-time Tracking</h3>
              <p>Track your parcels in real-time with our state-of-the-art system.</p> */}
            {/* </div> */}
            {/* <div className={styles.feature}>
              <Image src="/icons/security.svg" alt="Secure Handling" width={64} height={64} />
              <h3>Secure Handling</h3>
              <p>Your packages are handled with utmost care and security.</p>
            </div> */}
          {/* </div> */}
        </section>
        {/* Call to Action Section */}
        {/* <section className={styles.callToAction}>
          <h2>Ready to Send Your Parcel?</h2>
          <p>Sign up now and start sending with ease!</p>
          <Link href="/signup" className={styles.cta}>
            Get Started
          </Link>
        </section> */}
      </main>
    </>
  );
}