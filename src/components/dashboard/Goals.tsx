
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";
import { Goal } from "@/types";
import { sampleGoals } from "@/data/sampleData";
import { Calendar, CheckCircle, CircleX, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    due_date: "",
    completed: false
  });
  const { toast } = useToast();

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.due_date) return;
    
    const goal: Goal = {
      id: `goal-${Date.now()}`,
      user_id: "user123",
      title: newGoal.title,
      description: newGoal.description || "",
      due_date: newGoal.due_date,
      completed: false,
      created_at: new Date().toISOString()
    };
    
    setGoals([...goals, goal]);
    setIsDialogOpen(false);
    setNewGoal({
      title: "",
      description: "",
      due_date: "",
      completed: false
    });
    
    toast({
      title: "Goal Created",
      description: "Your learning goal has been created successfully!",
      duration: 3000,
    });
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    
    toast({
      title: "Goal Deleted",
      description: "Your goal has been deleted.",
      duration: 3000,
    });
  };

  // Filter goals by active and completed
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Learning Goals</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      <div className="space-y-6">
        {activeGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Active Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeGoals.map((goal) => (
                <Card key={goal.id} className="card-hover">
                  <CardContent className="p-4 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description || "No description provided"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleGoalCompletion(goal.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-primary/20 transition-colors"
                          aria-label="Mark as complete"
                        >
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </button>
                        <button
                          onClick={() => deleteGoal(goal.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-destructive/20 transition-colors"
                          aria-label="Delete goal"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due: {format(parseISO(goal.due_date), "PPP")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {completedGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Completed Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="bg-secondary/20 card-hover">
                  <CardContent className="p-4 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium line-through opacity-70">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 opacity-70">
                          {goal.description || "No description provided"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleGoalCompletion(goal.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-secondary transition-colors"
                          aria-label="Mark as incomplete"
                        >
                          <CircleX className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => deleteGoal(goal.id || "")}
                          className="bg-secondary/50 p-1 rounded hover:bg-destructive/20 transition-colors"
                          aria-label="Delete goal"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">
                        Completed
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {goals.length === 0 && (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No goals yet</h3>
              <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">
                Create your first learning goal to track your progress and stay motivated.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create a Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Learning Goal</DialogTitle>
            <DialogDescription>
              Set a clear, achievable learning goal with a specific deadline.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Learn Python Loops"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Practice for and while loops with examples"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={newGoal.due_date}
                onChange={(e) => setNewGoal({...newGoal, due_date: e.target.value})}
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
              onClick={handleCreateGoal}
              disabled={!newGoal.title || !newGoal.due_date}
            >
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
