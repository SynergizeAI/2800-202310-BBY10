"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import Link from "next/link";
import { Button } from "@/app/button";
import { Input } from "@/app/components/inputs/input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type FormType = "LOGIN" | "REGISTER";

const AuthenticationForm = () => {
  const [formType, setFormType] = useState<FormType>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormType = useCallback(() => {
    if (formType === "LOGIN") {
      setFormType("REGISTER");
    } else {
      setFormType("LOGIN");
    }
  }, [formType]);

  const form = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const register = form.register;
  const handleSubmit = form.handleSubmit;
  const errors = form.formState.errors;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (formType === "REGISTER") {
      console.log(data);
      axios.post('/api/register', data) 
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
    }

    if (formType === "LOGIN") {
      signIn('credentiials', {
        ...data,
        redirect: false
      }) 
      .then((callback) => {
        if (callback?.error) {

          toast.error('Invalid credentials');
        }

        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!')
        }
      })
      .finally(() => setIsLoading(false));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formType === "REGISTER" && (
          <Input
            placeholder="Name"
            id="name"
            label="Name"
            register={register}
            errors={errors}
          />
        )}
        <Input
          placeholder="Email address"
          id="email"
          label="Email address"
          type="email"
          register={register}
          errors={errors}
        />
        <Input
          placeholder="Password"
          id="password"
          label="Password"
          type="password"
          register={register}
          errors={errors}
        />
        <div>
          <Button
            variant="outline"
            disabled={isLoading}
            fullWidth
            type="submit"
          >
            {formType === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </div>
      </form>
      <div className="flex gap-2">
        <div>
          {formType === "LOGIN"
            ? "New to Synergize?"
            : "Already have an account?"}
        </div>
        <div onClick={toggleFormType} className="underline cursor-pointer">
          {formType === "LOGIN" ? "Create an account" : "Login"}
        </div>
      </div>
      <Link href="/" className="underline cursor-pointer">
        Forgot Password?
      </Link>
    </div>
  );
};

export default AuthenticationForm;
