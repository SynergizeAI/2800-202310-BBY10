import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/app/components/inputs/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/inputs/form";

const messageForm = z.object({
  message: z.string(),
});

export const MessageInput: React.FC<{ id: string; placeholder?: string }> = ({
  id,
  placeholder,
}) => {
  const form = useForm({
    resolver: zodResolver(messageForm),
    defaultValues: {
      message: "",
    },
  });

  return (
    <div className='relative w-full'>
      <Form {...form}>
        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id={id}
                  placeholder={placeholder}
                  {...field}
                  className='py-2 px-4 w-full  bg-gray-100 rounded-xl'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default MessageInput;
