export const authConfig = {
    providers:[],
    callbacks: {
      authorized({ auth, request }){
        const isLoggedIn = auth?.user;
        const isOnDashboard = request.nextUrl.pathname.startsWith("/");
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false;
        }else if (isLoggedIn){
          return Response.redirect(new URL("/admin", request.nextUrl));
        }
        return true;
      },
    },
  };