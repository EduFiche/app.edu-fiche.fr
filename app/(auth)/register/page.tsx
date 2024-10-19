"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createAuthClient } from "better-auth/react";
import SignInButtons from "../_components/SignInButtons";
import RegistrationForm from "./_components/RegistrationForm";
import { usePlunk } from "@/hooks/use-plunk";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
      message: "Veuillez entrer une adresse e-mail valide.",
    }),
    password: z.string().min(8, {
      message: "Le mot de passe doit contenir au moins 8 caractères.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });

export default function PageInscription() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp, signIn } = createAuthClient();
  const { sendEvent } = usePlunk();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      callbackURL: "/app",
    });

    sendEvent("user-welcome", values.email);

    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-black">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-black" />
        </div>
        <Card className="md:w-1/2 border-none shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Créer un compte
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
            <RegistrationForm
              form={form}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center w-full text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <a
                className="underline text-primary hover:text-primary/80"
                href="/login"
              >
                Se connecter
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
