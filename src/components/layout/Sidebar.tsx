
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Home, BookOpen, Video, MessageSquare, LayoutDashboard, Clock, Settings } from "lucide-react";
import { NavItem } from "@/types";

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "#overview",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Interaction History",
    href: "#history",
    icon: Home,
  },
  {
    title: "Notes",
    href: "#notes",
    icon: BookOpen,
  },
  {
    title: "Video Library",
    href: "#videos",
    icon: Video,
  },
  {
    title: "Learning Insights",
    href: "#insights",
    icon: Calendar,
  },
  {
    title: "Goals",
    href: "#goals",
    icon: Calendar,
  },
  {
    title: "Reminders",
    href: "#reminders",
    icon: Clock,
  },
  {
    title: "Feedback",
    href: "#feedback",
    icon: MessageSquare,
  },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const handleSectionClick = (href: string) => {
    const sectionId = href.replace("#", "");
    setActiveSection(sectionId);
    
    // Smooth scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="hidden md:flex h-screen flex-col bg-sidebar border-r border-sidebar-border fixed left-0 top-0 z-30 w-64 pb-4 pt-16">
      <div className="flex flex-col gap-2 px-2 py-2">
        <nav className="flex flex-1 flex-col px-2 py-2">
          <ul className="flex flex-1 flex-col gap-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSectionClick(item.href);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === item.href.replace("#", "")
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto px-4">
        <div className="rounded-md bg-sidebar-accent/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-primary"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>
            <span className="text-xs font-medium">Wizzly Extension</span>
          </div>
          <p className="text-xs text-sidebar-foreground">
            Install the Chrome extension to enhance your YouTube learning experience.
          </p>
        </div>
      </div>
    </div>
  );
}
