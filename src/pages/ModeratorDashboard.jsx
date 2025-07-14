import { useState } from "react";
import { User, BookOpen, MessageSquare, FileText, Plus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import UserProfile from "../components/dashboard/UserProfile";
import ManageScholarships from "../components/dashboard/ManageScholarships";
import AllReviews from "../components/dashboard/AllReviews";
import AllApplications from "../components/dashboard/AllApplications";
import AddScholarship from "../components/dashboard/AddScholarship";

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "manage-scholarships", label: "Manage Scholarships", icon: Settings },
    { id: "all-reviews", label: "All Reviews", icon: MessageSquare },
    { id: "all-applications", label: "All Applications", icon: FileText },
    { id: "add-scholarship", label: "Add Scholarship", icon: Plus },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "manage-scholarships":
        return <ManageScholarships />;
      case "all-reviews":
        return <AllReviews />;
      case "all-applications":
        return <AllApplications />;
      case "add-scholarship":
        return <AddScholarship />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage scholarships, applications, and reviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dashboard Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-none hover:bg-gray-50 transition-colors ${
                          activeTab === item.id
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            : "text-gray-700"
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;