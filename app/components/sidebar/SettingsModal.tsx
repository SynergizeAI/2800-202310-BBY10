/**
 * @file This file contains the SettingsModal component, which allows users to edit their profile information.
 */

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { CldUploadButton } from "next-cloudinary";

import { Input } from "../inputs/input";
import Modal from "../Modal";
import { Button } from "@/app/button";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../inputs/label";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

/**
 * SettingsModal component for editing user profile information.
 *
 * @param {SettingsModalProps} props - Component properties.
 * @returns {React.FC<SettingsModalProps>} The SettingsModal component.
 */
const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    console.log(result.info.secure_url);
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("submit");
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Edit your information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <div>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
            </div>
            <div>
              <Label>Photo</Label>
              <div className='mt-2 flex items-center gap-x-3 z-[10000]'>
                <Image
                  width='48'
                  height='48'
                  className='rounded-full'
                  src={image || currentUser?.image || "/images/placeholder.png"}
                  alt='Avatar'
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={(result: any) => {
                    console.log("onUpload called", result);
                    handleUpload(result);
                  }}
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                  uploadPreset='ml_default'>
                  <Button disabled={isLoading} variant='outline' type='button'>
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button disabled={isLoading} variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type='submit'>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
