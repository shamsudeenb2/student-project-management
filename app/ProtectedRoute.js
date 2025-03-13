import { getSession } from "@/app/configuration/auth"
import { redirect } from 'next/navigation'


const roleItems = [
      {
        role: "admin",
        path: "/admin/Student",
      },
      {
        role: "staff",
        path: "/lecturer",
      },
      {
        role: "student",
        path: "/students",
      },
      
]


const ProtectedRoute = async({ children, allowedRoles,  }) => {
  const  session = await getSession()
  console.log("in protected route session",session)


    console.log("Protected Route", !allowedRoles.includes(session?.user?.role))
  // if (status === 'loading') return <p>Loading...</p>;

  if (!session) {
    redirect("/")// Redirect to the sign-in page
    return null;
  }

  if (!allowedRoles.includes(session?.user?.role)) {
    roleItems.map((item) =>{
      if(item['role']===session?.user?.role){
        redirect(item['path'])
      }
    })
    // redirect('/login')
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;