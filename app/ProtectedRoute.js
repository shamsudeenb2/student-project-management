
import { redirect } from 'next/navigation';
// import { getServerSession } from "next-auth/next";
import {authOptions} from './api/auth/[...nextauth]/route'

const roleItems = [
      {
        role: "admin",
        path: "/admin",
      },
      {
        role: "student",
        path: "/student",
      },
      {
        role: "staff",
        path: "/staff",
      }
]


const ProtectedRoute = async({ children, allowedRoles,  }) => {
  
  const session = await getServerSession()

    console.log("Protected Route", session)
  

  if (!session?.user) {
    redirect('/')// Redirect to the sign-in page
    return null;
  }

  if (!allowedRoles.includes(session.user.role)) {
    roleItems.map((item) =>{
      if(item['role']===user.role){
        redirect(item['path'])
      }
    })
    redirect('/login')
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;