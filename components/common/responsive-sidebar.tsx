"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  FileText,
  BookOpen,
  BarChart2,
  Settings,
  FilePlus,
  File,
  FileText as FileTextSub,
  Edit,
  Activity,
  Book,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResponsiveSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const menuItems = [
    {
      title: "Fiches de Révision",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        {
          title: "Fiche Rapide",
          icon: <FileTextSub className="h-4 w-4" />,
          link: "/revision-sheets/quick-sheet",
        },
        {
          title: "Fiche Personnalisée",
          icon: <Edit className="h-4 w-4" />,
          link: "/revision-sheets/custom-sheet",
        },
        {
          title: "Mes Fiches",
          icon: <File className="h-4 w-4" />,
          link: "/revision-sheets/my-sheets",
        },
      ],
    },
    {
      title: "Quiz",
      icon: <BarChart2 className="h-5 w-5" />,
      submenu: [
        {
          title: "Quiz Rapide",
          icon: <Activity className="h-4 w-4" />,
          link: "/quizzes/quick-quiz",
        },
        {
          title: "Quiz Personnalisé",
          icon: <Edit className="h-4 w-4" />,
          link: "/quizzes/custom-quiz",
        },
        {
          title: "Ma Progression",
          icon: <BarChart2 className="h-4 w-4" />,
          link: "/quizzes/my-progress",
        },
      ],
    },
    {
      title: "Mes Cours",
      icon: <BookOpen className="h-5 w-5" />,
      submenu: [
        {
          title: "Créer un Cours",
          icon: <FilePlus className="h-4 w-4" />,
          link: "/my-courses/create-course",
        },
      ],
    },
    {
      title: "Carte Mentale",
      icon: <Book className="h-5 w-5" />,
      link: "/mindmap",
    },
    {
      title: "Paramètres",
      icon: <Settings className="h-5 w-5" />,
      link: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-semibold">EduFiche</h2>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-2 p-4">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.submenu ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                      onClick={() => toggleSubmenu(item.title)}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubmenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  ) : (
                    <Link href={item.link}>
                      <Button variant="ghost" className="w-full justify-start">
                        <span className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </span>
                      </Button>
                    </Link>
                  )}
                  <AnimatePresence initial={false}>
                    {item.submenu && openSubmenu === item.title && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-4 mt-2 space-y-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            variants={{
                              collapsed: { opacity: 0, y: -10 },
                              open: { opacity: 1, y: 0 },
                            }}
                            transition={{
                              duration: 0.2,
                              delay: subIndex * 0.1,
                            }}
                          >
                            <Link href={subItem.link}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start pl-8"
                              >
                                {subItem.icon}
                                <span className="ml-2">{subItem.title}</span>
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white p-4 flex justify-between lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
