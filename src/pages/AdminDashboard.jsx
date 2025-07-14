import { useState } from "react";
import { User, BookOpen, MessageSquare, FileText, Plus, Settings, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ManageUsers from "@/components/dashboard/ManageUsers";
import UserProfile from "../components/dashboard/UserProfile";
import AddScholarship from "../components/dashboard/AddScholarship";
import ManageScholarships from "../components/dashboard/ManageScholarships";
import AllApplications from "../components/dashboard/AllApplications";
import AllReviews from "../components/dashboard/AllReviews";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const sidebarItems = [
    { id: "profile", label: "Admin Profile", icon: User },
    { id: "add-scholarship", label: "Add Scholarship", icon: Plus },
    { id: "manage-scholarships", label: "Manage Scholarships", icon: Settings },
    { id: "all-applications", label: "Manage Applications", icon: FileText },
    { id: "manage-users", label: "Manage Users", icon: Users },
    { id: "all-reviews", label: "Manage Reviews", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "add-scholarship":
        return <AddScholarship />;
      case "manage-scholarships":
        return <ManageScholarships />;
      case "all-applications":
        return <AllApplications />;
      case "manage-users":
        return <ManageUsers />;
      case "all-reviews":
        return <AllReviews />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete system administration and management</p>
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

export default AdminDashboard;