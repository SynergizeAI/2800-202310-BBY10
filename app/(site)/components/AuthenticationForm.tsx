"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";
import { Button } from "@/app/button";
import { Input } from "@/app/components/inputs/input";

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
      //use axios to handle register later
    }

    if (formType === "LOGIN") {
      //use nextauth to handle login later
    }
  };


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
