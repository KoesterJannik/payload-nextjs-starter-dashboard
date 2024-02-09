"use client";

import ProfileUploader from "../../../components/dashboard/ProfileUpload";
import { useUserStore } from "../../../stores/userStore";

function Page() {
  const { user } = useUserStore();

  return (
    <div>
      <h1>Hello,{user?.email}</h1>

      <ProfileUploader />
    </div>
  );
}

export default Page;
