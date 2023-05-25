"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/app/components/inputs/input";
import { Button } from "@/app/button";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/inputs/form";
import { set } from "lodash";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email } = values;

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    setIsLoading(false);

    if (response.ok) {
      toast.success("Check your email for a link to reset your password.");
      router.push("/");
    } else {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50'>
      <div className='flex flex-col sm:mx-auto sm:w-full sm:max-w-md items-center justify-center'>
        <div className='flex mb-12 items-center gap-3'>
          <Image alt='logo' height='48' width='48' src='/images/logo.png' />
          <div className='text-2xl font-semibold'>Synergize</div>
        </div>
        <div className='bg-white px-4 py-8 border sm:rounded-lg sm:px-10'>
          <h2 className='text-xl font-semibold mb-8'>Forgot Password</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-80'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className='mb-4'
                        id='email'
                        type='email'
                        placeholder='Email address'
                        required={true}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send you a link to reset your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='w-full mt-6 mb-4 border-t border-slate-300'>
                <Button
                  className='w-full mt-6'
                  variant='default'
                  disabled={isLoading}
                  type='submit'>
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </>
                  ) : (
                    <span>Send Reset Link</span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
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
