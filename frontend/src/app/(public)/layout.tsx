import Link from "next/link";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      {children}
    </div>
  );
}

export default layout;
