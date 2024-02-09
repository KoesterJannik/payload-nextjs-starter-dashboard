"use client";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "../ui/label";
const ProfileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      handleUpload(e.target.files[0] as File);
    }
  };

  const handleUpload = async (selectedFile: File) => {
    const url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/media?profileImage=true";
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    queryClient.invalidateQueries();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Label htmlFor="file">Upload a profile picture</Label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
    </>
  );
};

export default ProfileUploader;
