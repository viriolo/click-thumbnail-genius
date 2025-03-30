
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Upload, Youtube, AlertCircle, RefreshCw } from "lucide-react";
import { mockVideos } from "../utils/mockData";

const CreateTest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<{ id: number; file?: File; preview: string }[]>([
    { id: 1, preview: "" },
    { id: 2, preview: "" },
  ]);
  const [testDuration, setTestDuration] = useState("48");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle thumbnail upload
  const handleThumbnailUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setThumbnails(prev => 
          prev.map(thumb => 
            thumb.id === id 
              ? { ...thumb, file, preview: event.target?.result as string } 
              : thumb
          )
        );
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Add new thumbnail slot
  const addThumbnail = () => {
    if (thumbnails.length < 5) {
      const newId = Math.max(...thumbnails.map(t => t.id)) + 1;
      setThumbnails([...thumbnails, { id: newId, preview: "" }]);
    } else {
      toast({
        title: "Maximum thumbnails reached",
        description: "You can test up to 5 thumbnails at once",
        variant: "destructive",
      });
    }
  };
  
  // Remove thumbnail slot
  const removeThumbnail = (id: number) => {
    if (thumbnails.length > 2) {
      setThumbnails(thumbnails.filter(thumb => thumb.id !== id));
    } else {
      toast({
        description: "You need at least 2 thumbnails for A/B testing",
        variant: "destructive",
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!selectedVideo) {
      toast({
        title: "Missing video",
        description: "Please select a video for testing",
        variant: "destructive",
      });
      return;
    }
    
    const validThumbnails = thumbnails.filter(thumb => thumb.preview);
    if (validThumbnails.length < 2) {
      toast({
        title: "Missing thumbnails",
        description: "Please upload at least 2 thumbnails for testing",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Test created successfully",
        description: "Your A/B test has been started",
      });
      navigate("/");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Test</h1>
        <p className="text-muted-foreground">
          Set up an A/B test for your YouTube video thumbnails
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Video</CardTitle>
              <CardDescription>
                Choose a YouTube video from your channel to test thumbnails
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">Recent Videos</TabsTrigger>
                  <TabsTrigger value="search">Search Videos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent">
                  <div className="space-y-4">
                    {mockVideos.map(video => (
                      <div 
                        key={video.id}
                        className={`flex items-center border rounded-lg p-3 cursor-pointer transition-all hover:border-primary ${selectedVideo === video.id ? 'border-primary bg-primary/5' : ''}`}
                        onClick={() => setSelectedVideo(video.id)}
                      >
                        <div className="h-20 w-36 rounded bg-muted overflow-hidden flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium line-clamp-1">{video.title}</h3>
                          <div className="flex items-center text-xs text-muted-foreground gap-3 mt-1">
                            <span>{video.views.toLocaleString()} views</span>
                            <span>Uploaded: {video.uploadDate}</span>
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="search">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Search your videos..." className="flex-1" />
                      <Button variant="outline" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center h-40 border rounded-lg border-dashed">
                      <div className="text-center text-muted-foreground">
                        <Youtube className="mx-auto h-8 w-8 mb-2" />
                        <p>Enter a search term to find videos</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upload Thumbnails</CardTitle>
              <CardDescription>
                Upload 2-5 thumbnail variations to test (recommended size: 1280x720)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {thumbnails.map((thumbnail) => (
                  <div key={thumbnail.id} className="relative">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-muted relative">
                        {thumbnail.preview ? (
                          <img 
                            src={thumbnail.preview} 
                            alt={`Thumbnail ${thumbnail.id}`} 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full p-4">
                            <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                            <Label 
                              htmlFor={`thumbnail-${thumbnail.id}`}
                              className="text-sm text-center text-muted-foreground cursor-pointer"
                            >
                              Click to upload <br />
                              <span className="text-xs">or drag and drop</span>
                            </Label>
                          </div>
                        )}
                        <Input
                          id={`thumbnail-${thumbnail.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleThumbnailUpload(thumbnail.id, e)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm font-medium">Thumbnail {thumbnail.id}</div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeThumbnail(thumbnail.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {thumbnails.length < 5 && (
                  <div className="border rounded-lg border-dashed flex items-center justify-center aspect-video cursor-pointer hover:border-primary transition-colors" onClick={addThumbnail}>
                    <div className="text-center p-4">
                      <div className="rounded-full bg-muted w-8 h-8 flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg font-medium">+</span>
                      </div>
                      <p className="text-sm font-medium">Add Thumbnail</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-amber-700">Important:</p>
                  <p>For best results, use thumbnails with similar content but different designs.
                  This will help you determine which visual elements drive the most clicks.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Test Settings</CardTitle>
              <CardDescription>
                Configure your A/B test parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="test-duration">Test Duration</Label>
                    <Select value={testDuration} onValueChange={setTestDuration}>
                      <SelectTrigger id="test-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24">24 hours</SelectItem>
                        <SelectItem value="48">48 hours</SelectItem>
                        <SelectItem value="72">72 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Recommended: 48-72 hours for sufficient data collection
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rotation-interval">Thumbnail Rotation Interval</Label>
                    <Select defaultValue="4">
                      <SelectTrigger id="rotation-interval">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Every hour</SelectItem>
                        <SelectItem value="2">Every 2 hours</SelectItem>
                        <SelectItem value="4">Every 4 hours</SelectItem>
                        <SelectItem value="6">Every 6 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How often thumbnails will be rotated during testing
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="auto-publish" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <Label htmlFor="auto-publish">Auto-publish winning thumbnail</Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Automatically set the best-performing thumbnail as the permanent one when the test concludes
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-notify" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                    <Label htmlFor="email-notify">Receive email notifications</Label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Get notified when your test starts, for daily reports, and when it completes
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" type="button" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Creating Test...
                  </>
                ) : (
                  "Start A/B Test"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateTest;
