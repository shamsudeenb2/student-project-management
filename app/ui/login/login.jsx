'use client'

import { signIn } from 'next-auth/react';
import { useState  } from 'react';
import styles from '../../ui/login/login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoader, setloginLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloginLoader(true)
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      // Handle login error
      toast("Invalid email or password");
      
      setloginLoader(false)
    } else {
      // Redirect to the dashboard or home page after successful login
      window.location.href = '/admin';
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>{loginLoader?(
            <FadeLoader
            color="#ffffff"
            loading={loginLoader}
            cssOverride={override}
            height={10}
            size={1}
            aria-label="Loading Spinner"
            data-testid="loader"
             />):("Login")}</button>
        </form>
        <ToastContainer/>
    </div>
  );
}