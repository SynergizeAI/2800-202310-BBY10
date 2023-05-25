"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/app/components/inputs/input";
import { Button } from "@/app/button";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
      toast.success("Check your email for a link to reset your password.");
      router.push("/");
    }
  };

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50'>
      <div className='flex flex-col sm:mx-auto sm:w-full sm:max-w-md items-center justify-center'>
        <div className='flex mb-12 items-center gap-3'>
          <Image alt='logo' height='48' width='48' src='/images/logo.png' />
          <div className='text-2xl font-semibold'>Synergize</div>
        </div>
        <div className=' bg-white px-4 py-8 border sm:rounded-lg sm:px-10 '>
          <h2 className=' text-xl font-semibold mb-8 '>Forgot Password</h2>
          <form className='w-80' onSubmit={handleSubmit}>
            <Input
              className='mb-4'
              id='email'
              label='Email address'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email address'
              required={true}
            />
            <div className='w-full mt-6 mb-4 border-t border-slate-300'>
              <Button className='w-full mt-6' variant='default' type='submit'>
                Send Reset Link
              </Button>
            </div>
          </form>
          <div className='flex gap-2'>
            <div>Already have an account?</div>
            <Link href='/' className='underline cursor-pointer'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
