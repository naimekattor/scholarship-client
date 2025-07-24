import { useState } from "react";
import { User, Settings, MessageSquare, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      case "profile": return <UserProfile />;
      case "manage-scholarships": return <ManageScholarships />;
      case "all-reviews": return <AllReviews />;
      case "all-applications": return <AllApplications />;
      case "add-scholarship": return <AddScholarship />;
      default: return <UserProfile />;
    }
  };

  return (
     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage scholarships, applications, and reviews</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader><CardTitle className="text-lg">Dashboard Menu</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <nav className="space-y-1">
                                {sidebarItems.map((item) => (
                                <button key={item.id} onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-none hover:bg-gray-100 transition-colors ${
                                    activeTab === item.id ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700" : "text-gray-700"
                                    }`}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />{item.label}
                                </button>
                                ))}
                            </nav>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-3">{renderContent()}</div>
            </div>
        </div>
    </div>
  );
};

export default ModeratorDashboard;