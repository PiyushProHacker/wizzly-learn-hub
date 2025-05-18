
import { useState } from "react";
import { sampleVideoInteractions } from "@/data/sampleData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Edit, Save } from "lucide-react";
import { format } from "date-fns";

export function NotesManagement() {
  const [notes, setNotes] = useState(
    sampleVideoInteractions.map(video => ({
      videoId: video.video_id,
      manualNote: video.notes.manual_note,
      isEditing: false
    }))
  );

  const handleEditNote = (videoId: string) => {
    setNotes(notes.map(note => 
      note.videoId === videoId 
        ? { ...note, isEditing: !note.isEditing } 
        : note
    ));
  };

  const handleNoteChange = (videoId: string, value: string) => {
    setNotes(notes.map(note => 
      note.videoId === videoId 
        ? { ...note, manualNote: value } 
        : note
    ));
  };

  const handleSaveNote = (videoId: string) => {
    setNotes(notes.map(note => 
      note.videoId === videoId 
        ? { ...note, isEditing: false } 
        : note
    ));
    // In a real app, we would save this to Supabase
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Notes Management</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleVideoInteractions.map((video, index) => {
          const noteData = notes.find(note => note.videoId === video.video_id);
          return (
            <Card key={index} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{video.notes.doc_title}</CardTitle>
                    <CardDescription className="text-xs">
                      {format(new Date(video.created_at), "PPP")}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(video.notes.doc_url, '_blank')}
                      aria-label="Open Google Doc"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Transcript Note</span>
                  </div>
                  <div className="bg-secondary/30 rounded-md p-2 text-sm">
                    {video.notes.transcript_note}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                    <div className="flex items-center gap-1">
                      <Edit className="h-3 w-3" />
                      <span>Manual Note</span>
                    </div>
                    {noteData?.isEditing ? (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-5 px-2" 
                        onClick={() => handleSaveNote(video.video_id)}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        <span className="text-xs">Save</span>
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-5 px-2" 
                        onClick={() => handleEditNote(video.video_id)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        <span className="text-xs">Edit</span>
                      </Button>
                    )}
                  </div>
                  
                  {noteData?.isEditing ? (
                    <Textarea
                      value={noteData.manualNote}
                      onChange={(e) => handleNoteChange(video.video_id, e.target.value)}
                      placeholder="Add your notes here..."
                      className="min-h-[80px] text-sm"
                    />
                  ) : (
                    <div className="bg-secondary/30 rounded-md p-2 text-sm min-h-[60px]">
                      {noteData?.manualNote || <span className="text-muted-foreground italic">No notes yet</span>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
