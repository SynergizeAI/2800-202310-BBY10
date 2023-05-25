// client-side scripting
"use client";

// Import necessary components and types from "react-hook-form"
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

/**
 * MessageInput component is a custom input component used to input messages.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {string} props.id - The ID for the input field.
 * @param {string} props.type - The type of the input field (e.g., "text", "password", etc.)
 * @param {boolean} props.required - Flag indicating whether the input field is required.
 * @param {UseFormRegister<FieldValues>} props.register - The register function from react-hook-form's useForm.
 * @param {FieldErrors} props.errors - Object containing any errors related to the form field.
 *
 * @returns {React.FC} The MessageInput component.
 */
const MessageInput: React.FC<{
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onSubmit: () => void;
}> = ({
  placeholder,
  id,
  type = "text", // set default type as "text"
  required = false, // set default required status as false
  register,
  errors,
  onSubmit,
}) => {
  return (
    <div className='relative w-full'>
      {/* Input field */}
      <textarea
        id={id}
        autoComplete={id} // Helps users complete forms based on earlier input.
        {...register(id, { required })} // Using react-hook-form's register function to register the input field
        placeholder={placeholder} // Placeholder text for the input field
        className='py-2 px-4 w-full resize-none h-10 bg-gray-100 rounded-xl' // Styling the input field
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
    </div>
  );
};

export default MessageInput;
