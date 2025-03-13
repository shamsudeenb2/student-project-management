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
        <div className={styles.title1}>
          <Link href="/" className={styles.homeTile}>
          <Image src="/afit.png" alt="" width={60} height={60} />
          <p>AFIT</p>
        </Link>
        </div>
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
