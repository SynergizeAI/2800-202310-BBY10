// pages/forgot-password.tsx
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      alert("Check your email for a link to reset your password.");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email'
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Home;
