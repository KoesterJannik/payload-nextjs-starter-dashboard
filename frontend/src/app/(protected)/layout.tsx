import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserProvider from "../providers/UserProvider";

import { SiteHeader } from "../../components/custom/site-header";
import { ThemeProvider } from "../../components/wrapper/ThemeProvider";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("payload-token");

  if (!authCookie) {
    redirect("/login");
  }
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>
          <SiteHeader />

          {children}
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
