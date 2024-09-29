import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  MessageSquare, 
  Settings
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      submenu: ['Analytics', 'Reports', 'Settings']
    },
    {
      title: 'Projects',
      icon: <FolderKanban className="h-5 w-5" />,
      submenu: ['Active', 'Archived', 'Create New']
    },
    {
      title: 'Tasks',
      icon: <CheckSquare className="h-5 w-5" />,
      submenu: ['Assigned', 'Completed', 'Overdue']
    },
    {
      title: 'Messages',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-semibold">Sidebar</h2>
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
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => toggleSubmenu(item.title)}
                  >
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </span>
                    {item.submenu && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubmenu === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Button>
                  <AnimatePresence initial={false}>
                    {item.submenu && openSubmenu === item.title && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="ml-4 mt-2 space-y-2 overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            variants={{
                              collapsed: { opacity: 0, y: -10 },
                              open: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.2, delay: subIndex * 0.1 }}
                          >
                            <Button
                              variant="ghost"
                              className="w-full justify-start pl-8"
                            >
                              <ChevronRight className="mr-2 h-4 w-4" />
                              {subItem}
                            </Button>
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
      <div className="lg:ml-64">
        <header className="bg-white p-4 shadow-sm">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>
        <main className="p-4">
          <h1 className="text-2xl font-semibold">Main Content</h1>
          <p className="mt-2">Your main content goes here.</p>
        </main>
      </div>
    </div>
  )
}