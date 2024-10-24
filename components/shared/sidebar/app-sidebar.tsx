"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  LayoutDashboard,
  Sparkle,
  Sparkles,
  Star,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Header1 } from "../header1";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;

  const data = {
    user: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.image || "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/app",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Accueil",
            url: "/app",
          },
        ],
      },
      {
        title: "Vos cours",
        url: "/app/courses",
        icon: Bot,
        items: [
          {
            title: "Accueil",
            url: "/app/courses",
          },
          {
            title: "Statistiques",
            url: "/app/courses/stats",
          },
        ],
      },
      {
        title: "Tutoriel",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Comment créer un nouveau dossier ?",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Nouveautés",
        url: "#",
        icon: Sparkles,
      },
      {
        name: "Donner votre avis",
        url: "#",
        icon: Star,
      },
    ],
  };
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={cn(state === "collapsed" && "hidden")}>
        <Header1>EduFiche</Header1>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
