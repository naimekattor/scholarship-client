import { useState } from "react";
import { Eye, Edit, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import AddReviewModal from "./AddReviewModal";

// Mock applications data
const applications = [
  {
    id: 1,
    universityName: "Harvard University",
    universityAddress: "Cambridge, MA, USA",
    feedback: "Application under review",
    subjectCategory: "Engineering",
    appliedDegree: "Masters",
    applicationFees: 50,
    serviceCharge: 100,
    status: "pending"
  },
  {
    id: 2,
    universityName: "Oxford University",
    universityAddress: "Oxford, UK",
    feedback: "Additional documents required",
    subjectCategory: "Medicine",
    appliedDegree: "Bachelor",
    applicationFees: 75,
    serviceCharge: 100,
    status: "processing"
  },
  {
    id: 3,
    universityName: "MIT",
    universityAddress: "Boston, MA, USA",
    feedback: "Application approved",
    subjectCategory: "Engineering",
    appliedDegree: "Masters",
    applicationFees: 60,
    serviceCharge: 100,
    status: "completed"
  }
];

const MyApplications = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingApp, setReviewingApp] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (app) => {
    if (app.status === "pending") {
      // Allow editing
      toast.success("Redirecting to edit application...");
    } else {
      toast.error("Cannot edit application. Application is processing.");
    }
  };

  const handleCancel = (appId) => {
    toast.success("Application cancelled successfully");
  };

  const handleAddReview = (app) => {
    setReviewingApp(app);
    setShowReviewModal(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>University</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Fees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.universityName}</TableCell>
                    <TableCell>{app.universityAddress}</TableCell>
                    <TableCell>{app.subjectCategory}</TableCell>
                    <TableCell>{app.appliedDegree}</TableCell>
                    <TableCell>${app.applicationFees + app.serviceCharge}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <strong>University:</strong> {app.universityName}
                              </div>
                              <div>
                                <strong>Subject:</strong> {app.subjectCategory}
                              </div>
                              <div>
                                <strong>Degree:</strong> {app.appliedDegree}
                              </div>
                              <div>
                                <strong>Feedback:</strong> {app.feedback}
                              </div>
                              <div>
                                <strong>Total Fees:</strong> ${app.applicationFees + app.serviceCharge}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(app)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancel(app.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddReview(app)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        application={reviewingApp}
      />
    </div>
  );
};

export default MyApplications;