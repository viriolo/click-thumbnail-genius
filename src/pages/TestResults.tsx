
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Play, 
  Pause,
  BarChart4,
  Medal,
  ExternalLink,
  Download,
  Mail
} from "lucide-react";
import { Test, getTestById } from "../utils/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  CTR: number;
}

const TestResults = () => {
  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    if (id) {
      // Simulate API request
      setTimeout(() => {
        const fetchedTest = getTestById(id);
        if (fetchedTest) {
          setTest(fetchedTest);
          
          // Prepare chart data
          const data = fetchedTest.thumbnails.map((thumbnail, index) => ({
            name: `Thumbnail ${index + 1}`,
            CTR: thumbnail.ctr
          }));
          setChartData(data);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Test Not Found</h2>
          <p className="text-muted-foreground mb-4">The test you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const isActive = test.status === 'active';
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 p-0 hover:bg-transparent">
            <Link to="/" className="flex items-center text-muted-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight line-clamp-1">{test.videoTitle}</h1>
          <div className="flex items-center mt-1">
            <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
              isActive ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {isActive ? (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Active Test
                </>
              ) : (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed Test
                </>
              )}
            </div>
            {isActive ? (
              <div className="flex items-center text-xs text-muted-foreground ml-3">
                <Clock className="h-3 w-3 mr-1" />
                {test.remainingTime}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground ml-3">
                Completed on {test.completedAt}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {isActive ? (
            <Button variant="outline" size="sm">
              <Pause className="mr-2 h-4 w-4" />
              Pause Test
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <a href={`https://youtube.com/watch?v=${test.videoId}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on YouTube
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Impressions
            </CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{test.impressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Number of times thumbnails were shown
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average CTR
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{test.averageCTR}%</div>
            <p className="text-xs text-muted-foreground">
              Average click-through rate across all thumbnails
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isActive ? "Leading Thumbnail" : "Winning Thumbnail"}
            </CardTitle>
            <Medal className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Thumbnail {isActive ? test.leadingThumbnail : test.winningThumbnail}
              {!isActive && test.improvement && (
                <span className="text-sm font-normal text-green-600 ml-2">
                  +{test.improvement}%
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isActive ? "Currently performing best" : "Final winning thumbnail"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Thumbnail Performance</CardTitle>
          <CardDescription>
            Compare how each thumbnail variation is performing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart View</TabsTrigger>
              <TabsTrigger value="thumbnails">Thumbnail View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart">
              <div className="graph-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'CTR (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="CTR" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="thumbnails">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {test.thumbnails.map((thumbnail, index) => {
                  const isLeading = (isActive && test.leadingThumbnail === String(index + 1)) ||
                                  (!isActive && test.winningThumbnail === String(index + 1));
                  
                  return (
                    <div key={thumbnail.id} className={`border rounded-lg overflow-hidden ${isLeading ? 'border-2 border-primary' : ''}`}>
                      <div className="relative">
                        <div className="aspect-video bg-muted">
                          <img 
                            src={thumbnail.url} 
                            alt={`Thumbnail ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        {isLeading && (
                          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
                            {isActive ? 'Leading' : 'Winner'}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Thumbnail {index + 1}</h3>
                          <span className={`text-sm font-medium ${isLeading ? 'text-primary' : ''}`}>
                            {thumbnail.ctr}% CTR
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Performance</span>
                              <span className="font-medium">{
                                thumbnail.ctr / Math.max(...test.thumbnails.map(t => t.ctr)) * 100
                              }%</span>
                            </div>
                            <Progress 
                              value={thumbnail.ctr / Math.max(...test.thumbnails.map(t => t.ctr)) * 100} 
                              className={isLeading ? "bg-primary/20" : ""}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-muted-foreground">Impressions</div>
                              <div className="font-medium">{thumbnail.impressions.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Clicks</div>
                              <div className="font-medium">{thumbnail.clicks.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {!isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Test Conclusion</CardTitle>
            <CardDescription>
              Final results and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Thumbnail {test.winningThumbnail} is the clear winner</h3>
                  <p className="text-muted-foreground">
                    This thumbnail outperformed the others with a CTR of {test.winningCTR}%, which is {test.improvement}% higher than the average.
                    We've automatically published this thumbnail to your video.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-b py-6 my-6">
                <h3 className="text-lg font-medium mb-4">What made this thumbnail successful?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 text-blue-600 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">Strong Contrast</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The winning thumbnail uses high contrast colors that stand out in YouTube feeds.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 text-blue-600 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">Clear Text</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Large, readable text that communicates value quickly to potential viewers.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 text-blue-600 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">Emotional Appeal</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The facial expression creates curiosity and emotional connection.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 text-blue-600 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">Focus on Benefits</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Clearly communicates what viewers will gain from watching.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to="/create-test">
                    <Play className="mr-2 h-4 w-4" />
                    Start a New Test
                  </Link>
                </Button>
                
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Full Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestResults;
