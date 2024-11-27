"use client"
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "@/app/ui/navbar/navbar.module.css"
import { usePathname } from 'next/navigation'

function AuthButton(){
    const {data: session} = useSession()

    const pathname = usePathname()
    console.log('path name', pathname.split('/').splice(1,1).pop())
    if(session){
        return(
            <div className={styles.nav} >
              <div className={styles.navNameLinks}>
              <Link href={`/${pathname.split('/').splice(1,1).pop()}`}><div>Home</div></Link>
              <>
              {session?.user?.role==="staff"?(
                <>
                   <Link href="/students"><div>staff</div></Link>
                </>
               ):session?.user?.role ==="student"?(
                <>
                   <Link href="/students"><div>student</div></Link>
                </>
              ):(<></>)}
               </>
              </div>
              <div className={styles.navNameButton}>
              <diV className={styles.navName}>
                {session?.user?.name} 
              </diV>
              <button onClick={()=> signOut({ callbackUrl: '/' })}>Sign Out</button>
              </div>
            </div>
        )
    }
    return(
        <>
          <div className={styles.signIn}><Link href='/login'>Sign in</Link></div>
        </>
    )
}

export default AuthButton