
import { useState } from "react";
import { Eye, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock applications data
const mockApplications = [
  {
    id: 1,
    applicantName: "John Doe",
    universityName: "Harvard University",
    degree: "Masters",
    subjectCategory: "Engineering",
    applicationDate: "2024-01-15",
    status: "pending",
    applicationFees: 50,
    serviceCharge: 100
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    universityName: "Oxford University",
    degree: "Bachelor",
    subjectCategory: "Medicine",
    applicationDate: "2024-01-10",
    status: "processing",
    applicationFees: 75,
    serviceCharge: 100
  },
  {
    id: 3,
    applicantName: "Mike Johnson",
    universityName: "MIT",
    degree: "Masters",
    subjectCategory: "Engineering",
    applicationDate: "2024-01-08",
    status: "completed",
    applicationFees: 60,
    serviceCharge: 100
  }
];

const AllApplications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedback, setFeedback] = useState("");

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

  const handleViewDetails = (app) => {
    setSelectedApp(app);
  };

  const handleFeedback = (app) => {
    setFeedbackApp(app);
    setFeedback("");
  };

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      toast.error("Please enter feedback");
      return;
    }
    
    // Update application with feedback
    setApplications(applications.map(app => 
      app.id === feedbackApp.id 
        ? { ...app, feedback: feedback }
        : app
    ));
    
    toast.success("Feedback submitted successfully");
    setFeedbackApp(null);
    setFeedback("");
  };

  const handleCancel = (appId) => {
    setApplications(applications.map(app => 
      app.id === appId 
        ? { ...app, status: "rejected" }
        : app
    ));
    toast.success("Application cancelled successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Applied Scholarships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.applicantName}</TableCell>
                    <TableCell>{app.universityName}</TableCell>
                    <TableCell>{app.degree}</TableCell>
                    <TableCell>{app.subjectCategory}</TableCell>
                    <TableCell>{app.applicationDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(app)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFeedback(app)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancel(app.id)}
                        >
                          <X className="h-4 w-4" />
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

      {/* Application Details Modal */}
      <Dialog open={selectedApp !== null} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Applicant:</strong> {selectedApp.applicantName}
                </div>
                <div>
                  <strong>University:</strong> {selectedApp.universityName}
                </div>
                <div>
                  <strong>Degree:</strong> {selectedApp.degree}
                </div>
                <div>
                  <strong>Subject:</strong> {selectedApp.subjectCategory}
                </div>
                <div>
                  <strong>Application Date:</strong> {selectedApp.applicationDate}
                </div>
                <div>
                  <strong>Total Fees:</strong> ${selectedApp.applicationFees + selectedApp.serviceCharge}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={feedbackApp !== null} onOpenChange={() => setFeedbackApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="feedback">Feedback for {feedbackApp?.applicantName}</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Enter your feedback here..."
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setFeedbackApp(null)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitFeedback} className="bg-blue-600 hover:bg-blue-700">
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllApplications;
