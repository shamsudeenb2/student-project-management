'use client'
import styles from './home.module.css'
import Image from 'next/image';
import { useState, useEffect } from 'react';
// import styles from '../styles/Home.module.css';

export default function Header() {
  const images = ['/afitplaneenginerr.jpeg', '/afitLecture.jpeg', '/afitadminbuilding.jpeg'];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
      <header className={styles.hero} style={{ backgroundImage:`url(${images[currentImage]})` }}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Welcome to Supervisor Project Management System</h1>
          <p>Shaping the future of aerospace and technology</p>
          <a href="/login" className={styles.ctaButton}>
            Explore Programs
          </a>
        </div>
      </header>
  )
}