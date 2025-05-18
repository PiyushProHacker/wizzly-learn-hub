
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function Header() {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center gap-2 mr-4 lg:mr-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 rounded-full bg-gradient-to-br from-wizzly-500 to-purple-500 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="hidden md:block text-xl font-semibold tracking-tight">
              <span className="text-gradient">Wizzly</span>
            </h1>
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email ? user.email.substring(0, 2).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {user.user_metadata?.name || user.email?.split("@")[0]}
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSignOut}
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
