"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/services/Auth/login";
import { useAuthStore } from "@/store/authStore";
import { showToast } from "@/lib/toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LoginForm from "./components/LoginForm";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { trigger: login, isMutating: isLoggingIn } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      setUser(user.data.Data);
      console.log("Login successful:", user);
      showToast.success("Login successful!");
      router.push("/todos");
    } catch (error) {
      console.error("Login failed:", error);
      showToast.error("Login failed. Please check your credentials.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoggingIn={isLoggingIn}
          />
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">not have an account? </span>
            <a href="/register" className="text-primary hover:underline">
              Register
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
