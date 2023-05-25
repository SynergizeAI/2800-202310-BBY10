"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/app/components/inputs/input";
import { Button } from "@/app/button";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/inputs/form";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const passwordForm = z
    .object({
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password can't be longer than 16 characters"),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"], // path of error
    });

  const form = useForm<z.infer<typeof passwordForm>>({
    resolver: zodResolver(passwordForm),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof passwordForm>) {
    const { password } = values;

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
    } else {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50'>
      <div className='flex flex-col sm:mx-auto sm:w-full sm:max-w-md items-center justify-center'>
        <div className='flex mb-12 items-center gap-3'>
          <Image alt='logo' height='48' width='48' src='/images/logo.png' />
          <div className='text-2xl font-semibold'>Synergize</div>
        </div>
        <div className=' bg-white px-4 py-8 border sm:rounded-lg sm:px-10 '>
          <h2 className=' text-xl font-semibold mb-8 '>Reset Password</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-80'>
              <div className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className='mb-4'
                          id='password'
                          type='password'
                          placeholder='Password'
                          required={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          className='mb-4'
                          id='confirm'
                          type='password'
                          placeholder='Confirm Password'
                          required={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full mt-6 mb-4 border-t border-slate-300'>
                <Button className='w-full mt-6' variant='default' type='submit'>
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
