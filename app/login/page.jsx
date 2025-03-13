
import { signIn } from 'next-auth/react';
import styles from '../ui/login/login.module.css';
import LoginForm from '../ui/login/login'
import Image from 'next/image';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.loginHead}>
        <Image src={'/afit.png' } width={90} height={90}/>
        <h2 className={styles.title}>Welcome Back!</h2>
        <h4 className={styles.title1}>Login</h4>
        </div>
         <LoginForm />
      </div>
    </div>
  );
}