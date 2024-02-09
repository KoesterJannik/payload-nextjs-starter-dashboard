"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
async function getUserDetails() {
  const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users/me";

  return axios.get(endpoint, { withCredentials: true });
}

function UserProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const query = useQuery({ queryKey: ["me"], queryFn: getUserDetails });
  const { setUser } = useUserStore();
  useEffect(() => {
    if (query.data?.data?.user) {
      console.log(query.data?.data?.user);
      setUser(query.data?.data?.user);
    }
  }, [query.data?.data?.user, setUser]);

  return <>{children}</>;
}

export default UserProvider;
