"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { checkAuth, login, register } from "@/api/user";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/common/loader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const { toast } = useToast();
  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    async function authenticate() {
      try {
        const data = await checkAuth();
        setIsAuthenticated(data.isAuthenticated);
        if (data.isAuthenticated) {
          toast({
            title: "Success",
            description: "Successfully authenticated",
          });
        }
      } catch (error) {
        console.error("Failed to check authentication", error);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: "Failed to check authentication",
        });
      }
    }

    authenticate();
  }, []);

  async function onLogin(data: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      const response = await login(data.email, data.password);
      if (response.isAuthenticated) {
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Successfully logged in",
        });
      } else {
        console.error("Login failed:", response.message);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: `Login failed: ${response.message}`,
        });
      }
    } catch (error) {
      console.error("Failed to login", error);
      setIsAuthenticated(false);
      toast({
        title: "Error",
        description: "Failed to login",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onRegister(data: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    try {
      const response = await register(data.email, data.password);
      if (response.isAuthenticated) {
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Successfully registered",
        });
      } else {
        console.error("Registration failed:", response.message);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: `Registration failed: ${response.message}`,
        });
      }
    } catch (error) {
      console.error("Failed to register", error);
      setIsAuthenticated(false);
      toast({
        title: "Error",
        description: "Failed to register",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Dialog open={!isAuthenticated}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center flex flex-col items-center">
                Bienvenue sur EduFiche
              </DialogTitle>
              <DialogDescription className="text-center">
                Votre plateforme de révision en ligne
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="login">
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)}>
                    <FormField name="email">
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <input
                            type="email"
                            {...loginForm.register("email")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <FormField name="password">
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <input
                            type="password"
                            {...loginForm.register("password")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)}>
                    <FormField name="email">
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <input
                            type="email"
                            {...registerForm.register("email")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <FormField name="password">
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <input
                            type="password"
                            {...registerForm.register("password")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
