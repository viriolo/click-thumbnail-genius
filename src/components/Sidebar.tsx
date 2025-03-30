
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutDashboard, BarChart3 } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Main Menu
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant={isActive("/") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link to="/">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/create-test") ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link to="/create-test">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Test
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Analytics
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start"
              disabled
            >
              <Link to="/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Performance Stats
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-medium">Need Help?</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Our support team is ready to assist you with any questions.
          </p>
          <Button variant="outline" size="sm" className="mt-2 w-full text-xs">
            Contact Support
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
