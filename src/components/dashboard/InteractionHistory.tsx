
import { useState } from "react";
import { Link } from "react-router-dom";
import { sampleVideoInteractions } from "@/data/sampleData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export function InteractionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Filter interactions based on search query and selected date
  const filteredInteractions = sampleVideoInteractions.filter(interaction => {
    const matchesSearch = searchQuery === "" ||
      interaction.video_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interaction.questions.some(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    const matchesDate = !selectedDate || 
      interaction.created_at.startsWith(selectedDate);
      
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Interaction History</h2>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interactions..."
              className="pl-8 max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-8 w-full sm:w-auto"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredInteractions.length > 0 ? (
        <div className="space-y-4">
          {filteredInteractions.map((interaction, index) => (
            <Card key={index} className="p-4 bg-card card-hover">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-24 overflow-hidden rounded-md">
                    <img
                      src={interaction.thumbnail_url || "https://via.placeholder.com/320x180.png?text=Video"}
                      alt={interaction.video_title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <a 
                        href={interaction.video_url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-base md:text-lg font-medium hover:text-primary transition-colors"
                      >
                        {interaction.video_title}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(interaction.created_at), "PPP")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {interaction.questions.slice(0, 2).map((q, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-sm font-medium">
                          <span className="text-primary">Q: </span>
                          {q.question}
                        </p>
                        <p className="text-sm text-muted-foreground pl-4">
                          <span className="font-medium text-foreground">A: </span>
                          {q.answer.length > 150 ? `${q.answer.substring(0, 150)}...` : q.answer}
                        </p>
                      </div>
                    ))}
                    
                    {interaction.questions.length > 2 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        +{interaction.questions.length - 2} more questions
                      </p>
                    )}
                    
                    <div className="pt-2">
                      <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                        <Link to={`/video/${interaction.video_id}`}>
                          View Full Details <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No interactions found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or date filter
          </p>
        </div>
      )}
    </div>
  );
}
