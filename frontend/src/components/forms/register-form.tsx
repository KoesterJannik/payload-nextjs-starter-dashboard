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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

async function registerUser({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return axios.post(`${URL}/api/users`, { email, password });
}

async function loginUser({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return axios.post(`${URL}/api/users/login`, { email, password });
}

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    },
  });
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      toast.success("registered");
    },
    onError: (error) => {
      console.log(error);
      toast("could not register");
    },
  });
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Logged in");
    },
    onError: (error) => {
      console.log(error);
      toast("could not login");
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(URL);
    const res = await mutation.mutateAsync(values);
    console.log(res.status);
    if (res.status === 201) {
      const res = await loginMutation.mutateAsync(values);
      console.log(res.data);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    }
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full max-w-sm mx-auto"
            >
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="yourmail@example.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create an account</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
