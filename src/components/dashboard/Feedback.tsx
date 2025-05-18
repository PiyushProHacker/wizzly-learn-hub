
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, CheckCircle, HelpCircle } from "lucide-react";
import { sampleFeedback } from "@/data/sampleData";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const faqItems = [
  {
    question: "How do I start a voice conversation?",
    answer: "Click the microphone icon in the Wizzly extension when watching a YouTube video, then speak your question clearly."
  },
  {
    question: "Can I export my notes?",
    answer: "Yes! Click the export button in the Wizzly extension to save your notes to Google Docs."
  },
  {
    question: "How does Wizzly work with educational videos?",
    answer: "Wizzly enhances educational videos by allowing you to ask questions, take notes, and save important information for later review."
  },
  {
    question: "Is Wizzly available on mobile devices?",
    answer: "Currently, Wizzly is only available as a Chrome extension for desktop browsers. Mobile support is planned for future releases."
  },
  {
    question: "How can I contact support?",
    answer: "You can submit feedback through this dashboard or email support@wizzly.app for direct assistance."
  }
];

export function Feedback() {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentFeedback, setRecentFeedback] = useState(sampleFeedback);
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!feedbackMessage.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newFeedback = {
        id: `feedback-${Date.now()}`,
        user_id: "user123",
        message: feedbackMessage,
        created_at: new Date().toISOString()
      };
      
      setRecentFeedback([newFeedback, ...recentFeedback]);
      setFeedbackMessage("");
      setIsSubmitting(false);
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Feedback & Support</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Send Feedback</span>
              </CardTitle>
              <CardDescription>
                Share your thoughts and suggestions to help improve Wizzly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Tell us what you think or suggest new features..."
                className="min-h-[120px] resize-none"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
              />
              <Button 
                onClick={handleSubmitFeedback} 
                disabled={isSubmitting || !feedbackMessage.trim()}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </CardContent>
          </Card>
          
          {recentFeedback.length > 0 && (
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="text-base">Your Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentFeedback.map((item, index) => (
                  <div key={index} className="bg-secondary/30 rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <p className="text-sm">{item.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {format(parseISO(item.created_at || ""), "MMM d")}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
            <CardDescription>
              Quick answers to common questions about Wizzly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
