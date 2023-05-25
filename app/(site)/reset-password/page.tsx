"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { Input } from "@/app/components/inputs/input";
import { Button } from "@/app/button";
import { toast } from "react-hot-toast";

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
      toast.success("Password reset!");
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
          <h2 className=' text-xl font-semibold mb-8 '>Reset Password</h2>
          <form className='w-80' onSubmit={handleSubmit}>
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='New password'
              className='mb-4'
              id='password'
              label='New password'
              required={true}
            />
            <div className='w-full mt-6 mb-4 border-t border-slate-300'>
              <Button className='w-full mt-6' variant='default' type='submit'>
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
