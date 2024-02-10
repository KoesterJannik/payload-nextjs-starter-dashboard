"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { useUserStore } from "../../stores/userStore";

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

async function changePassword({
  password,
  userId,
}: {
  password: string;
  userId: string;
}) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return axios.patch(
    `${URL}/api/users/${userId}`,
    { password },
    {
      withCredentials: true,
    }
  );
}

export function ChangePasswordForm() {
  const { user } = useUserStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success("Password was changed");
    },
    onError: (error) => {
      toast("could not change password");
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.

    await changePasswordMutation.mutateAsync({
      password: values.password,
      userId: user.id,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Label className="sr-only" htmlFor="NewPassword">
            New password
          </Label>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="new password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2">
            Change Password
          </Button>
        </form>
      </Form>
    </>
  );
}
