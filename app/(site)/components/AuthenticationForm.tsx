"use client";

/**
 * Handles user authentication
 * Toggles between login and register
 * Routes to /users if user is authenticated
 */

import { useCallback, useState, useEffect } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import Link from "next/link";
import { Button } from "@/app/button";
import { Input } from "@/app/components/inputs/input";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// formType states
type FormType = "LOGIN" | "REGISTER";

const AuthenticationForm = () => {
  const session = useSession();
  const router = useRouter();
  const [formType, setFormType] = useState<FormType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  // redirect to /users if user is authenticated
  // ? is used so that we don't get an error if session is undefined
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleFormType = useCallback(() => {
    if (formType === "LOGIN") {
      setFormType("REGISTER");
    } else {
      setFormType("LOGIN");
    }
  }, [formType]);

  // useForm hook from react-hook-form for form handling
  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Destructure the register, handleSubmit, formState from form object
  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (formType === "REGISTER") {
      // console.log(data);
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    }

    if (formType === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className='flex flex-col sm:mx-auto sm:w-full sm:max-w-md items-center justify-center'>
      <div className='flex mb-12 items-center gap-3'>
        <Image alt='logo' height='48' width='48' src='/images/logo.png' />
        <div className='text-2xl font-semibold'>Synergize</div>
      </div>
      <div
        className='
        bg-white
        px-4
        py-8
        border
        sm:rounded-lg
        sm:px-10
        '>
        <h2
          className='
              text-xl
              font-semibold
              mb-8
            '>
          {formType === "LOGIN" ? "Sign in to your account" : "Sign up"}
        </h2>
        <form className='w-80' onSubmit={handleSubmit(onSubmit)}>
          {formType === "REGISTER" && (
            <Input
              className='mb-4'
              placeholder='Name'
              id='name'
              label='Name'
              register={register}
              errors={errors}
            />
          )}
          <Input
            className='mb-4'
            placeholder='Email address'
            id='email'
            label='Email address'
            type='email'
            register={register}
            errors={errors}
          />
          <Input
            className='mb-4'
            placeholder='Password'
            id='password'
            label='Password'
            type='password'
            register={register}
            errors={errors}
          />
          <div className='w-full mt-6 mb-4 border-t border-slate-300'>
            <Button
              className='w-full mt-6'
              variant='default'
              disabled={isLoading}
              type='submit'>
              {formType === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
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
        {/* <Link href='/' className='underline cursor-pointer'>
          Forgot Password?
        </Link> */}
      </div>
    </div>
  );
};

export default AuthenticationForm;
