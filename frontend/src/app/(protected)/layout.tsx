import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProvider from "../providers/UserProvider";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("payload-token");

  if (!authCookie) {
    redirect("/login");
  }
  return (
    <div>
      <UserProvider>{children}</UserProvider>
    </div>
  );
}

export default Layout;
