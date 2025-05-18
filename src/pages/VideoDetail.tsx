
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sampleVideoInteractions } from "@/data/sampleData";
import { VideoInteraction } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { BookOpen, Edit, ExternalLink, FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const VideoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoInteraction | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [manualNote, setManualNote] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would be a database query
    const foundVideo = sampleVideoInteractions.find(v => v.video_id === id);
    if (foundVideo) {
      setVideo(foundVideo);
      setManualNote(foundVideo.notes.manual_note);
    } else {
      navigate("/");
      toast({
        title: "Video not found",
        description: "The requested video could not be found.",
        variant: "destructive"
      });
    }
  }, [id, toast, navigate]);
  
  const handleSaveNote = () => {
    if (!video) return;
    
    // In a real app, this would be a database update
    setVideo({
      ...video,
      notes: {
        ...video.notes,
        manual_note: manualNote
      }
    });
    setIsEditingNote(false);
    
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully."
    });
  };
  
  const handleExportToGoogleDocs = () => {
    // In a real app, this would connect to Google Docs API
    toast({
      title: "Exporting to Google Docs",
      description: "Your notes are being exported to Google Docs."
    });
    // For demo purposes, just open the Google Docs URL if it exists
    if (video?.notes.doc_url) {
      window.open(video.notes.doc_url, '_blank');
    }
  };
  
  const handleExportToNotion = () => {
    // In a real app, this would connect to Notion API
    toast({
      title: "Exporting to Notion",
      description: "Your notes are being exported to Notion."
    });
  };
  
  if (!video) return (
    <ThemeProvider>
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load the video details.</p>
          </div>
        </div>
      </AppLayout>
    </ThemeProvider>
  );
  
  return (
    <ThemeProvider>
      <AppLayout>
        <div className="space-y-6">
          {/* Back button */}
          <div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">← Back to Dashboard</Link>
            </Button>
          </div>
          
          {/* Video details header */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                <img 
                  src={video.thumbnail_url || "https://via.placeholder.com/320x180.png?text=Video"} 
                  alt={video.video_title}
                  className="w-full h-full object-cover"
                />
                <a 
                  href={video.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 text-white" />
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight">{video.video_title}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Added on {format(new Date(video.created_at), "PPP")}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleExportToGoogleDocs}>
                  <FileText className="h-4 w-4 mr-1" />
                  Export to Google Docs
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportToNotion}>
                  <FileText className="h-4 w-4 mr-1" />
                  Export to Notion
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open Video
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid grid-cols-2 md:w-[400px]">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="questions">Questions & Answers</TabsTrigger>
            </TabsList>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Transcript Note</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/30 rounded-md p-4 text-sm whitespace-pre-wrap">
                    {video.notes.transcript_note}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Manual Note</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditingNote(!isEditingNote)}
                    >
                      {isEditingNote ? (
                        <><Save className="h-4 w-4 mr-1" /> Save</>
                      ) : (
                        <><Edit className="h-4 w-4 mr-1" /> Edit</>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditingNote ? (
                    <div className="space-y-2">
                      <Textarea
                        value={manualNote}
                        onChange={(e) => setManualNote(e.target.value)}
                        className="min-h-[200px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setIsEditingNote(false);
                            setManualNote(video.notes.manual_note);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleSaveNote}
                        >
                          Save Note
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-secondary/30 rounded-md p-4 text-sm min-h-[100px] whitespace-pre-wrap">
                      {manualNote || <span className="text-muted-foreground italic">No manual notes yet. Click 'Edit' to add notes.</span>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Questions Tab */}
            <TabsContent value="questions" className="space-y-4 mt-6">
              {video.questions.map((question, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center shrink-0">
                          <span className="font-semibold text-sm">Q</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-medium">{question.question}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Asked at {question.timestamp}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <div className="rounded-full bg-secondary p-2 h-8 w-8 flex items-center justify-center shrink-0">
                          <span className="font-semibold text-sm">A</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{question.answer}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </ThemeProvider>
  );
};

export default VideoDetail;
