import Link from "next/link";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export default layout;
