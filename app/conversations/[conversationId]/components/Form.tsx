// client-side scripting
"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import { toast } from "react-hot-toast";

/**
 * A form for sending a message in a conversation.
 *
 * @returns {React.FC} The form component.
 */
const Form = () => {
  // Get the conversation ID from the conversation context
  const { conversationId } = useConversation();

  // Setup the form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { message: "" },
  });

  /**
   * Handler for submitting the form.
   *
   * @param {Object} data - The form data.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // return if message is over 1000 characters
    if (data.message.length > 1000) {
      toast.error("Message must be less than 1000 characters.");
      return;
    }

    if (data.message.length === 0) {
      toast.error("Message cannot be empty.");
      return;
    }

    // Reset the message field
    setValue("message", "", { shouldValidate: true });

    // Post a new message
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  /**
   * Handler for uploading an image.
   *
   * @param {Object} result - The result of the upload.
   */
  const handleUpload = (result: any) => {
    // Post a new message with the image
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  // Render the component
  return (
    <div className='py-4 px-4zborder-t flex items-center gap-2 lg:gap-4 w-full p-4 '>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset='ml_default'>
        <HiPhoto size={30} className='text-black' />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'>
        <MessageInput id='message' placeholder='Write a message' />
        <button type='submit' className=' p-2 bg-black'>
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
  );
};

export default Form;
