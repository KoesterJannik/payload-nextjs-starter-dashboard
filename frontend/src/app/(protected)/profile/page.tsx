"use client";

import ProfileUploader from "../../../components/dashboard/ProfileUpload";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePasswordForm } from "../../../components/forms/change-password-form";
function Page() {
  return (
    <Tabs defaultValue="account" className="w-full px-20">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              You can edit your profile information here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ProfileUploader />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ChangePasswordForm />
          </CardContent>
          <CardFooter>
   
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default Page;
