
import { ThemeProvider } from "@/context/ThemeContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { InteractionHistory } from "@/components/dashboard/InteractionHistory";
import { NotesManagement } from "@/components/dashboard/NotesManagement";
import { LearningInsights } from "@/components/dashboard/LearningInsights";
import { VideoLibrary } from "@/components/dashboard/VideoLibrary";
import { Feedback } from "@/components/dashboard/Feedback";
import { Goals } from "@/components/dashboard/Goals";
import { Reminders } from "@/components/dashboard/Reminders";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <div className="space-y-12">
          <section id="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Welcome to your Wizzly Dashboard. Track your learning journey and manage your interactions.
            </p>
          </section>
          
          <section id="insights">
            <LearningInsights />
          </section>
          
          <Separator />
          
          <section id="history">
            <InteractionHistory />
          </section>
          
          <Separator />
          
          <section id="notes">
            <NotesManagement />
          </section>
          
          <Separator />
          
          <section id="videos">
            <VideoLibrary />
          </section>
          
          <Separator />
          
          <section id="goals">
            <Goals />
          </section>
          
          <Separator />
          
          <section id="reminders">
            <Reminders />
          </section>
          
          <Separator />
          
          <section id="feedback">
            <Feedback />
          </section>
        </div>
      </AppLayout>
    </ThemeProvider>
  );
};

export default Index;
