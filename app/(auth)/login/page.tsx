"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./_components/LoginForm";
import { createAuthClient } from "better-auth/react";
import Link from "next/link";
import SignInButtons from "../_components/SignInButtons";

export default function LoginPage() {
  const { signIn } = createAuthClient();
  const signInGithub = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/app",
    });
  };

  const signInGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/app",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-black">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-black" />
        </div>
        <Card className="md:w-1/2 border-none shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Connexion
            </CardTitle>
            <CardDescription className="text-center">
              Choisissez votre méthode d'inscription préférée
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SignInButtons
              signInGithub={signInGithub}
              signInGoogle={signInGoogle}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuez avec
                </span>
              </div>
            </div>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-muted-foreground">
              Vous n'avez pas de compte ?{" "}
              <Link
                className="underline text-primary hover:text-primary/80"
                href="/register"
              >
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
