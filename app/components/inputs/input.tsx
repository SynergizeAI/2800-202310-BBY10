// shadcn/ui component

import * as React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Label } from "./label";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, ...props }, ref) => {
    return (
      <>
        <Label htmlFor={props.id}>{props.label}</Label>
        <input
          {...register(props.id)}
          type={type}
          className={cn(
            "flex h-10 w-full border border-input px-3 py-2",
            className
          )}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
