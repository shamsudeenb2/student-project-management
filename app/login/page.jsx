
import { signIn } from 'next-auth/react';
import styles from '../ui/login/login.module.css';
import LoginForm from '../ui/login/login'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>AFIT Project Management System</h2>
         <LoginForm />
      </div>
    </div>
  );
}