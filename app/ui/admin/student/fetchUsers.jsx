'use client'
import styles from "@/app/ui/admin/student/student.module.css";
import {useState, useEffect, useCallback} from "react"
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FetchUser = ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [usersLoading, setLoadingUsers] = useState(false)
  const [usersError, setUsersError] = useState(null)

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/actions/postUser?id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('deleteSupabaseItem - ResponseOK - data deleted',);
        router.push("/admin/Student");
      } else {
        // Handle the error
        console.log('deleteSupabaseItem - Response not OK');
      }
    } catch (error) {
      console.log('deleteSupabaseItem - try/catch error');
      console.error('deleteSupabaseItem - try/catch error - error', error);
    }
  };

  useEffect(()=>{
    const getUsers= async()=>{
        setLoadingUsers(true)
        setUsersError(null)
        const response = await fetch('http://localhost:3000//api/actions/postUser')
            setLoadingUsers(false)
        if(response.error){
            return setUsersError(response.error)
        }
        const data = await response.json();
        setUsers(data)
    }
    getUsers()
},[])
console.log('courses', users?.users)
  return (
        <>
        {usersLoading && <tr>Loading  ...</tr>}
             {users.users?.map((user) => (
            <tr key={user.id} >
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.personalNo}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.state}</td>
              <td>{user.role}</td>
              <td>{user.program}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/Student/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Edit
                    </button>
                  </Link>
                  {user.role ==="student"?(
                    <>
                        <Link href={`/admin/AssignSupervisor/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Assign Supervisor
                    </button>
                  </Link>
                  </>)
                    
                  :(<></>)}
                    <input type="hidden" name="id" />
                    <button className={`${styles.button} ${styles.delete}`} onClick={()=>deleteUser(user._id)}>
                      Delete
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </>
     );
  };

export default FetchUser;
