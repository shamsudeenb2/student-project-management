"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import NavMenu from "../../component/NavMenu"
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import Link from "next/link";
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}
        <div className={styles.title1}><Link href="/"><Image src="/afitLogo1.PNG" width={50} height={50} /></Link></div>
         <div className={styles.menu}>
          {/* <div className={styles.search}> */}
             <NavMenu />
          {/* </div> */}
           {/* {pathname ==='/login'?(<></>):(
            <>
           <div className={styles.icons}>
            <MdOutlineChat size={20} />
            <MdNotifications size={20} />
            <MdPublic size={20} />
           </div>
          </>
        )} */}
       </div>
    </div>
  );
};

export default Navbar;
