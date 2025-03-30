
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Play, Pause, ChevronRight, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { mockActiveTests, mockCompletedTests } from "../utils/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("active");

  // Select tests based on active tab
  const displayedTests = activeTab === "active" ? mockActiveTests : mockCompletedTests;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor your thumbnail A/B tests
          </p>
        </div>
        <Button asChild size="sm" className="md:w-auto w-full">
          <Link to="/create-test">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Test
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Tests
            </CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockActiveTests.length}</div>
            <p className="text-xs text-muted-foreground">
              Tests currently running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tests
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCompletedTests.length}</div>
            <p className="text-xs text-muted-foreground">
              Tests with results available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average CTR Increase
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.3%</div>
            <p className="text-xs text-muted-foreground">
              From your winning thumbnails
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">Active Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="active" className="mt-6">
          <div className="grid gap-4">
            {displayedTests.length > 0 ? (
              displayedTests.map((test) => (
                <div key={test.id} className="group relative">
                  <Link to={`/test/${test.id}`}>
                    <Card className="overflow-hidden transition-all hover:border-primary">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 w-full h-36 bg-muted">
                            <img 
                              src={test.thumbnails[0].url} 
                              alt={test.videoTitle} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="p-6 flex flex-col justify-between flex-1">
                            <div>
                              <h3 className="font-semibold line-clamp-1">{test.videoTitle}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
                                  {test.thumbnails.length} Thumbnails
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {test.remainingTime}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <div className="text-muted-foreground">Impressions</div>
                                <div className="font-medium">{test.impressions.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Avg. CTR</div>
                                <div className="font-medium">{test.averageCTR}%</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Leading</div>
                                <div className="font-medium">Thumbnail {test.leadingThumbnail}</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No active tests</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Start A/B testing your YouTube thumbnails to find the ones that perform best
                  </p>
                  <Button asChild size="sm">
                    <Link to="/create-test">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Your First Test
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-4">
            {displayedTests.length > 0 ? (
              displayedTests.map((test) => (
                <div key={test.id} className="group relative">
                  <Link to={`/test/${test.id}`}>
                    <Card className="overflow-hidden transition-all hover:border-primary">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 w-full h-36 bg-muted relative">
                            <img 
                              src={test.thumbnails[Number(test.winningThumbnail) - 1]?.url || test.thumbnails[0].url} 
                              alt={test.videoTitle} 
                              className="w-full h-full object-cover" 
                            />
                            {test.winningThumbnail && (
                              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-medium px-2 py-1">
                                Winner
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col justify-between flex-1">
                            <div>
                              <h3 className="font-semibold line-clamp-1">{test.videoTitle}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                                  Completed
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {test.completedAt}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <div className="text-muted-foreground">Impressions</div>
                                <div className="font-medium">{test.impressions.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Winner CTR</div>
                                <div className="font-medium">{test.winningCTR}%</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Improvement</div>
                                <div className="font-medium text-green-600">+{test.improvement}%</div>
                              </div>
                            </div>
                          </div>
                          <div className="p-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-blue-50 p-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No completed tests yet</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Your completed tests will appear here once they've finished running
                  </p>
                  <Button asChild size="sm">
                    <Link to="/create-test">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create a Test
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
