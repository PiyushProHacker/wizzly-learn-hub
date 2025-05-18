
import { useState } from "react";
import { Link } from "react-router-dom";
import { sampleVideoInteractions } from "@/data/sampleData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, List, Grid, ExternalLink, ArrowRight } from "lucide-react";
import { format, parseISO } from "date-fns";

type ViewMode = "grid" | "list";

export function VideoLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  
  // Filter and sort videos
  const filteredVideos = [...sampleVideoInteractions]
    .filter(video => 
      video.video_title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return a.video_title.localeCompare(b.video_title);
      }
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Video Library</h2>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search videos..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-1 ml-auto sm:ml-0">
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("date")}
              className="text-xs"
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "title" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("title")}
              className="text-xs"
            >
              A-Z
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "border-primary" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "border-primary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {filteredVideos.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail_url || "https://via.placeholder.com/320x180.png?text=Video"}
                    alt={video.video_title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 w-full">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-white/80">
                          {format(parseISO(video.created_at), "MMM d, yyyy")}
                        </span>
                        <span className="text-xs bg-primary/80 text-white px-2 py-0.5 rounded-full">
                          {video.questions.length} Q&A
                        </span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href={video.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </a>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium truncate" title={video.video_title}>
                    {video.video_title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Notes: {video.notes.manual_note ? "Yes" : "No"}
                  </p>
                  <div className="mt-3">
                    <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-xs text-primary hover:text-primary/80">
                      <Link to={`/video/${video.video_id}`}>
                        View Details <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredVideos.map((video, index) => (
              <Card key={index} className="card-hover">
                <div className="flex p-3 gap-4">
                  <div className="flex-shrink-0 w-40 h-24 relative rounded-md overflow-hidden">
                    <img
                      src={video.thumbnail_url || "https://via.placeholder.com/320x180.png?text=Video"}
                      alt={video.video_title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 right-1 text-xs bg-primary/80 text-white px-2 py-0.5 rounded-full">
                      {video.questions.length} Q&A
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{video.video_title}</h3>
                      <a 
                        href={video.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-secondary p-1 rounded-full hover:bg-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(parseISO(video.created_at), "PPP")}
                    </span>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="bg-secondary px-2 py-1 rounded text-xs">
                        {video.notes.manual_note ? "Has Notes" : "No Notes"}
                      </span>
                      <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-xs text-primary hover:text-primary/80">
                        <Link to={`/video/${video.video_id}`}>
                          View Details <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No videos found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
