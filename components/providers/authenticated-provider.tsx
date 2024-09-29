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
import { FaGoogle } from "react-icons/fa";
import { checkAuth, googleSignIn } from "@/api/user";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/common/loader";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

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

  async function onGoogleSignIn() {
    setIsLoading(true);
    try {
      const response = await googleSignIn();
      if (response.success) {
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Successfully signed in with Google",
        });
      } else {
        console.error("Google sign-in failed:", response.message);
        setIsAuthenticated(false);
        toast({
          title: "Error",
          description: `Google sign-in failed: ${response.message}`,
        });
      }
    } catch (error) {
      console.error("Failed to sign in with Google", error);
      setIsAuthenticated(false);
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
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
            <div className="flex justify-center">
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={onGoogleSignIn}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FaGoogle className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Connexion en cours..." : "Connexion avec Google"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
