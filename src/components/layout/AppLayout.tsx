
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        
        <main className="flex-1 pt-16 md:pl-64">
          <div className="container py-6 px-4 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
