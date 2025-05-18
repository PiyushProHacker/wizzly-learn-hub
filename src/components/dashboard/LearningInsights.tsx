
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sampleVideoInteractions } from "@/data/sampleData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

export function LearningInsights() {
  // Extract topics from questions
  const extractTopics = () => {
    const topics: Record<string, number> = {};
    
    sampleVideoInteractions.forEach(video => {
      video.questions.forEach(q => {
        const questionLower = q.question.toLowerCase();
        
        // Simple keyword extraction
        const keywords = [
          "loop", "range", "function", "python", "javascript", 
          "dovetail", "joint", "woodworking", "closure", "prototype"
        ];
        
        keywords.forEach(keyword => {
          if (questionLower.includes(keyword)) {
            topics[keyword] = (topics[keyword] || 0) + 1;
          }
        });
      });
    });
    
    // Convert to array and sort
    return Object.entries(topics)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 topics
  };

  const topTopics = extractTopics();

  // Weekly video count data
  const weeklyData = [
    { name: "Mon", videos: 2 },
    { name: "Tue", videos: 1 },
    { name: "Wed", videos: 3 },
    { name: "Thu", videos: 0 },
    { name: "Fri", videos: 2 },
    { name: "Sat", videos: 1 },
    { name: "Sun", videos: 0 },
  ];

  // Calculate total videos and questions
  const totalVideos = sampleVideoInteractions.length;
  const totalQuestions = sampleVideoInteractions.reduce(
    (acc, video) => acc + video.questions.length, 0
  );
  
  // Weekly goal progress (hardcoded for demo)
  const weeklyGoalProgress = 60; // 60% of weekly goal
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Learning Insights</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Weekly Progress</CardTitle>
            <CardDescription>Videos watched vs. weekly goal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{totalVideos} videos</span>
                <span>5 video goal</span>
              </div>
              <Progress value={weeklyGoalProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">{weeklyGoalProgress}% of weekly goal</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Questions Asked</CardTitle>
            <CardDescription>Total interactions with videos</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">{totalQuestions}</div>
            <p className="text-sm text-muted-foreground">across {totalVideos} videos</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Learning Streak</CardTitle>
            <CardDescription>Consecutive days learning</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-base">Top Topics</CardTitle>
            <CardDescription>Based on your questions</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topTopics}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,30,30,0.8)",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {topTopics.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#8b5cf6" : "#0c8fe5"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="text-base">Weekly Activity</CardTitle>
            <CardDescription>Videos watched per day</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "rgba(30,30,30,0.8)",
                      border: "none",
                      borderRadius: "6px",
                      color: "white",
                    }}
                  />
                  <defs>
                    <linearGradient id="colorVideos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="videos"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorVideos)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-base">Recommended Next Videos</CardTitle>
          <CardDescription>Based on your learning patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                <div className="text-primary text-xl">#1</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Python Advanced Loops</h4>
                <p className="text-xs text-muted-foreground">Continue your learning path</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                <div className="text-primary text-xl">#2</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">JavaScript Closures Deep Dive</h4>
                <p className="text-xs text-muted-foreground">Expand your knowledge</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                <div className="text-primary text-xl">#3</div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Woodworking Advanced Joints</h4>
                <p className="text-xs text-muted-foreground">Related to your interests</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
