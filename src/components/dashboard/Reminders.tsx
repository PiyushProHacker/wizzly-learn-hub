
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format, parseISO, isAfter } from "date-fns";
import { Reminder } from "@/types";
import { sampleReminders } from "@/data/sampleData";
import { Bell, Calendar, Clock, Plus, Trash2, CheckCircle, BellOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(sampleReminders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: "",
    due_datetime: "",
    completed: false
  });
  const { toast } = useToast();

  const handleCreateReminder = () => {
    if (!newReminder.title || !newReminder.due_datetime) return;
    
    const reminder: Reminder = {
      id: `reminder-${Date.now()}`,
      user_id: "user123",
      title: newReminder.title,
      due_datetime: newReminder.due_datetime,
      completed: false,
      created_at: new Date().toISOString()
    };
    
    setReminders([...reminders, reminder]);
    setIsDialogOpen(false);
    setNewReminder({
      title: "",
      due_datetime: "",
      completed: false
    });
    
    toast({
      title: "Reminder Created",
      description: "Your reminder has been set successfully!",
      duration: 3000,
    });
  };

  const toggleReminderCompletion = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    
    toast({
      title: "Reminder Deleted",
      description: "Your reminder has been deleted.",
      duration: 3000,
    });
  };

  // Filter reminders by active, today, and completed
  const now = new Date();
  const activeReminders = reminders.filter(reminder => 
    !reminder.completed && isAfter(parseISO(reminder.due_datetime), now)
  );
  
  const todayReminders = reminders.filter(reminder => {
    const reminderDate = parseISO(reminder.due_datetime);
    return !reminder.completed && 
      reminderDate.getDate() === now.getDate() &&
      reminderDate.getMonth() === now.getMonth() &&
      reminderDate.getFullYear() === now.getFullYear();
  });
  
  const completedReminders = reminders.filter(reminder => reminder.completed);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Reminders</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Reminder
        </Button>
      </div>

      <div className="space-y-6">
        {todayReminders.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-yellow-500" />
              Today
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayReminders.map((reminder) => (
                <Card key={reminder.id} className="border-yellow-500/30 card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{reminder.title}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-yellow-500">
                            {format(parseISO(reminder.due_datetime), "h:mm a")}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleReminderCompletion(reminder.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-primary/20 transition-colors"
                          aria-label="Mark as complete"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </button>
                        <button
                          onClick={() => deleteReminder(reminder.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-destructive/20 transition-colors"
                          aria-label="Delete reminder"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeReminders.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-primary" />
              Upcoming
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeReminders.map((reminder) => (
                <Card key={reminder.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{reminder.title}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(reminder.due_datetime), "PPP")}
                          </span>
                          <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                          <span className="text-xs text-muted-foreground">
                            {format(parseISO(reminder.due_datetime), "h:mm a")}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleReminderCompletion(reminder.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-primary/20 transition-colors"
                          aria-label="Mark as complete"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </button>
                        <button
                          onClick={() => deleteReminder(reminder.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-destructive/20 transition-colors"
                          aria-label="Delete reminder"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {completedReminders.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium flex items-center">
              <BellOff className="h-4 w-4 mr-2 text-muted-foreground" />
              Completed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedReminders.map((reminder) => (
                <Card key={reminder.id} className="bg-secondary/20 card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium line-through opacity-70">{reminder.title}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground opacity-70" />
                          <span className="text-xs text-muted-foreground opacity-70">
                            {format(parseISO(reminder.due_datetime), "PPP")}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteReminder(reminder.id || "")}
                        className="bg-secondary/50 p-1 rounded hover:bg-destructive/20 transition-colors"
                        aria-label="Delete reminder"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {reminders.length === 0 && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No reminders yet</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
                Create reminders to stay on track with your learning schedule.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create a Reminder
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Reminder Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Reminder</DialogTitle>
            <DialogDescription>
              Set a reminder for your learning activities.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Review JavaScript Tutorial"
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due_datetime">Date & Time</Label>
              <Input
                id="due_datetime"
                type="datetime-local"
                value={newReminder.due_datetime}
                onChange={(e) => setNewReminder({...newReminder, due_datetime: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateReminder}
              disabled={!newReminder.title || !newReminder.due_datetime}
            >
              Create Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
