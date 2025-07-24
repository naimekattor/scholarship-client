import { useState } from "react";
import { User, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserProfile from "../components/dashboard/UserProfile";
import MyApplications from "../components/dashboard/MyApplications";
import MyReviews from "../components/dashboard/MyReviews";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "applications", label: "My Applications", icon: FileText },
    { id: "reviews", label: "My Reviews", icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <UserProfile />;
      case "applications": return <MyApplications />;
      case "reviews": return <MyReviews />;
      default: return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your scholarship applications and profile</p>
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

export default UserDashboard;