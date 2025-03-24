"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "@/app/ui/navbar/navbar.module.css"
import { usePathname } from 'next/navigation'

import Image from "next/image";
import Notification from "./chat/Notifications"

function AuthButton(){
    const {data: session} = useSession()

    const [showUser, setShowUser] = useState(false)

    const pathname = usePathname()
    console.log('path session role', session?.user?.role)
    if(session){
        return(
            <div className={styles.nav} >
              <div className={styles.navNameLinks}>
                 <Link href={`/${pathname.split('/').splice(1,1).pop()}`}><div >Home</div></Link>
              <>
              {session?.user?.role==="staff"?(
                <>
                   <Link href="/lecturer/view-courses" className={pathname === "/lecturer/view-courses" && styles.active}><p >Courses</p></Link>
                   <Link href="/lecturer/view-student"className={pathname === "/lecturer/view-student" && styles.active}><p >Students</p></Link>
                   <Link href={`/students/${session?.user?.id}/chat`} className={pathname === `/students/${session?.user?.id}/chat` && styles.active}><p>Chats</p></Link>
                   <Link href={`/students/${session?.user?.id}/files`} className={pathname === `/students/${session?.user?.id}/files`&& styles.active}><p >Files</p></Link>
                </>
               ):session?.user?.role ==="student"?(
                <>
                   <Link href="/students/add" className={pathname === "/students/add" && styles.active}><p >courses</p></Link>
                   <Link href={`/students/${session?.user?.id}/chat`} className={pathname === `/students/${session?.user?.id}/chat` && styles.active}><p >Chats</p></Link>
                   <Link href={`/students/${session?.user?.id}/files`} className={pathname === `/students/${session?.user?.id}/files` && styles.active}><p >Files</p></Link>
                </>
              ):(<>
                  <Link href="/admin/lecturer" className={pathname === "/admin/lecturer" && styles.active}><p >Lecturers</p></Link>
                  <Link href="/admin/Student" className={pathname === "/admin/Student" && styles.active}><p >Students</p></Link>
                  <Link href="/admin/Staff" className={pathname === "/admin/Staff"&& styles.active}><p >Courses</p></Link>
                  
                </>)}
               </>
              </div>
              {/* <div className={styles.navNameButton}>
              <diV className={styles.navName}>
                {session?.user?.name} 
              </diV>
              <button onClick={()=> signOut({ callbackUrl: '/' })}>Sign Out</button>
              </div> */}
              <div className={styles.navNameButton}>
                {/* <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer'>
                    <Image src="/message.png" alt="" width={20} height={20}/>
                </div> */}
                {/* <div className='bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative'>
                    <Image src="/announcement.png" alt="" width={20} height={20}/>
                    <div className='absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs'>1</div>
                 </div> */}
                 <Notification/>
                <div className={styles.navNameItem}>
                   {session?.user?.img?(<>
                    <Image src={`/profile/${session?.user?.img}`} alt="" width={40} height={40} className={styles.navItemImg}/>
                   </>):(
                    <>
                      <Image src={`/avarter.svg`} alt="" width={40} height={40} className={styles.navItemImg}/>
                    </>
                   )}
                   <div className={styles.navbarItem}>
                    <Image src={"/arrow.svg"} alt="" 
                   width={10} height={10}
                   onClick={()=>setShowUser(!showUser)}
                   className={showUser?styles.rotateUp:styles.rotatedown}/>
               </div>
                </div>
              </div>
              {showUser&&(
                <div className={styles.showUser}>
                    <div className={styles.showUserItems}>
                       <span className={styles.navItemName}>{session?.user?.name}</span>
                       <span className={styles.navItemRole}>{session?.user?.role}</span>
                       <button onClick={()=> signOut({ callbackUrl: '/' })}>Log out</button>
                    </div>
                </div>
              )}
            </div>
        )
    }
    return(
        <>
          <div className={styles.signIn}><Link href='/login'>Login</Link></div>
        </>
    )
}

export default AuthButton