"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";

import { Input } from "@/app/components/inputs/input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/Modal";
import { Button } from "@/app/button";
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

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

/**
 * GroupChatModal component displays a modal for creating a group chat.
 * @param {GroupChatModalProps} props - The props object containing isOpen, onClose, and users.
 * @returns {JSX.Element} The GroupChatModal component.
 */
const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users = [],
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  /**
   * Handles the form submission.
   * @param {FieldValues} data - The form data.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (data.members.length < 2) {
      toast.error("Requires a minimum of 2 members.");
      setIsLoading(false);
      return;
    }

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
        reset({ name: "", members: [] }); // use reset here
        setSearchValue("");
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
          <DialogDescription>Requires a minimum of 2 members.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <div>
              <Input
                placeholder="What's the group name?"
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
            </div>
            <div>
              <Select
                disabled={isLoading}
                label='Members'
                options={
                  searchValue
                    ? users.map((user) => ({
                        value: user.id,
                        label: user.name,
                        icon: user.image,
                      }))
                    : []
                }
                onInputChange={(value: string) => setSearchValue(value)}
                onChange={(value) => {
                  setValue("members", value);
                  trigger("members");
                }}
                value={members}
              />
            </div>
          </div>
          <DialogFooter>
            <div className='mt-6'>
              <Button disabled={isLoading} type='submit'>
                Create
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GroupChatModal;
