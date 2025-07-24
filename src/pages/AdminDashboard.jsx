import { useState } from "react";
import { User, FileText, Settings, Users, MessageSquare, Plus, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfile from "../components/dashboard/UserProfile";
import ManageUsers from "@/components/dashboard/ManageUsers";
import AddScholarship from "../components/dashboard/AddScholarship";
import ManageScholarships from "../components/dashboard/ManageScholarships";
import AllApplications from "../components/dashboard/AllApplications";
import AllReviews from "../components/dashboard/AllReviews";
import AdminAnalytics from "@/components/dashboard/AdminAnalytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const sidebarItems = [
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "profile", label: "Admin Profile", icon: User },
    { id: "add-scholarship", label: "Add Scholarship", icon: Plus },
    { id: "manage-scholarships", label: "Manage Scholarships", icon: Settings },
    { id: "all-applications", label: "Manage Applications", icon: FileText },
    { id: "manage-users", label: "Manage Users", icon: Users },
    { id: "all-reviews", label: "Manage Reviews", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "analytics": return <AdminAnalytics />;
      case "profile": return <UserProfile />;
      case "add-scholarship": return <AddScholarship />;
      case "manage-scholarships": return <ManageScholarships />;
      case "all-applications": return <AllApplications />;
      case "manage-users": return <ManageUsers />;
      case "all-reviews": return <AllReviews />;
      default: return <AdminAnalytics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete system administration and management</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader><CardTitle className="text-lg">Dashboard Menu</CardTitle></CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-none hover:bg-gray-100 transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;