"use client";

import { User, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { courses } from "@prisma/client";
import Link from "next/link";

export default function CourseCard({ courses }: { courses: courses }) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-sm relative">
      <Link href={`/app/courses/${courses.id}`} prefetch>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center w-full justify-between">
            {courses.name}
            <div className="relative w-8 h-8">
              <svg className="w-full h-full" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  fill="none"
                  stroke="#4338ca"
                  strokeWidth="4"
                  strokeDasharray="88"
                  strokeDashoffset="22"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium">{0}d</span>
              </div>
            </div>
          </CardTitle>
          <p className="text-xs text-gray-400">
            Créé le {formatDate(courses.createdAt)} • Mis à jour le{" "}
            {formatDate(courses.updatedAt)}
          </p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="border px-2 py-1 rounded-full text-xs">
                    {courses.numberOfLikes} 👍
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{courses.numberOfLikes} likes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="text-sm">Par toi</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-full flex items-center justify-center  focus:outline-none focus:ring-2 ">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Plus d'options</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Modifier le cours</DropdownMenuItem>
              <DropdownMenuItem>Partager le cours</DropdownMenuItem>
              <DropdownMenuItem className="text-red-400">
                Supprimer le cours
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Link>
    </Card>
  );
}
