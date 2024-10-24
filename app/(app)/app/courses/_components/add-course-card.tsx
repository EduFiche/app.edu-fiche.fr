"use client";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CoursesForm from "./courses-form";

export default function AddCourseCard() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sharedContentModal = {
    title: "Ajout d'un nouveau cours",
    description: "Vous pouvez ajouter autant de cours que vous le souhaitez. ",
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="border-dashed border-2 border-gray-400 cursor-pointer text-center">
            <CardHeader className="h-full w-full flex justify-center items-center">
              <CardTitle className="flex items-center justify-center ">
                <span className="mr-2">+</span>
                Ajouter un nouveau cours
              </CardTitle>
            </CardHeader>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{sharedContentModal.title}</DialogTitle>
            <DialogDescription>
              {sharedContentModal.description}
            </DialogDescription>
          </DialogHeader>
          <CoursesForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card className="border-dashed border-2 border-gray-400 cursor-pointer text-center">
          <CardHeader className="h-full w-full flex justify-center items-center">
            <CardTitle className="flex items-center justify-center ">
              <span className="mr-2">+</span>
              Ajouter un nouveau cours
            </CardTitle>
          </CardHeader>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{sharedContentModal.title}</DrawerTitle>
          <DrawerDescription>
            {sharedContentModal.description}
          </DrawerDescription>
        </DrawerHeader>
        <CoursesForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
