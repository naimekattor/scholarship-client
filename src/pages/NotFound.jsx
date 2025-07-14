import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-200">404</h1>
          <div className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</div>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/scholarships">
                <Search className="mr-2 h-4 w-4" />
                Browse Scholarships
              </Link>
            </Button>
          </div>
          
          <div className="pt-8">
            <img 
              src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400&h=300&fit=crop" 
              alt="Page not found illustration" 
              className="mx-auto rounded-lg shadow-md opacity-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;