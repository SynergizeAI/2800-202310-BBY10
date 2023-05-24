"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        newPassword: password,
      }),
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='New password'
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default ResetPassword;
