"use client";

import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/button";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/app/components/inputs/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/inputs/form";

type FormType = "LOGIN" | "REGISTER";

const AuthenticationForm = () => {
  const session = useSession();
  const router = useRouter();
  const [formType, setFormType] = useState<FormType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleFormType = useCallback(() => {
    setFormType(formType === "LOGIN" ? "REGISTER" : "LOGIN");
  }, [formType]);

  const registerFormSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters"),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ["confirm"], // path of error
    });

  const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm({
    resolver: zodResolver(
      formType === "REGISTER" ? registerFormSchema : loginFormSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof registerFormSchema | typeof loginFormSchema>
  ) {
    setIsLoading(true);
    const { email, password } = values;

    if (formType === "REGISTER") {
      axios
        .post("/api/register", values)
        .then(() => signIn("credentials", { email, password }))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    } else if (formType === "LOGIN") {
      signIn("credentials", {
        email,
        password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            router.push("/conversations");
            toast.success("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <div className='flex flex-col sm:mx-auto sm:w-full sm:max-w-md items-center justify-center'>
      <div className='flex mb-12 items-center gap-3'>
        <Image alt='logo' height='48' width='48' src='/images/logo.png' />
        <div className='text-2xl font-semibold'>Synergize</div>
      </div>
      <div className=' bg-white px-4 py-8 border sm:rounded-lg sm:px-10 '>
        <h2 className=' text-xl font-semibold mb-8 '>
          {formType === "LOGIN" ? "Sign in to your account" : "Sign up"}
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-80'>
            <div className='flex flex-col gap-4'>
              {formType === "REGISTER" && (
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className='mb-4'
                          id='name'
                          placeholder='Name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className='mb-4'
                        id='email'
                        type='email'
                        placeholder='Email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className='mb-4'
                        id='password'
                        type='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formType === "REGISTER" && (
                <FormField
                  control={form.control}
                  name='confirm'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className='mb-4'
                          id='confirm'
                          type='password'
                          placeholder='Confirm Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className='w-full mt-6 mb-4 border-t border-slate-300'>
              <Button
                className='w-full mt-6'
                disabled={isLoading}
                type='submit'>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </>
                ) : (
                  <span>{formType === "LOGIN" ? "Sign in" : "Register"}</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className='flex gap-2'>
          <div>
            {formType === "LOGIN"
              ? "New to Synergize?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleFormType} className='underline cursor-pointer'>
            {formType === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
        <Link href='/forgot-password' className='underline cursor-pointer'>
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default AuthenticationForm;
