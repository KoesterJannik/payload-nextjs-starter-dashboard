"use client";
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
const ProfileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const url =
      process.env.NEXT_PUBLIC_BACKEND_URL + "/api/media?profileImage=true";
    const formData = new FormData();
    formData.append("file", file as Blob);
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    queryClient.invalidateQueries();
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
};

export default ProfileUploader;
