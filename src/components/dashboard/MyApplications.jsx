import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { Eye, Edit, X, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AddReviewModal from "./AddReviewModal";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingApp, setReviewingApp] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/applications/my');
      return res.data;
    }
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/applications/my/${id}/cancel`),
    onSuccess: () => {
      toast.success("Application cancelled successfully");
      queryClient.invalidateQueries(['my-applications']);
    },
    onError: (err) => toast.error(err.response?.data?.message || "Failed to cancel.")
  });

  const getStatusColor = (status) => ({
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  }[status] || "bg-gray-100 text-gray-800");

  const handleEdit = (app) => {
    if (app.status === "pending") toast.error("Edit functionality is not yet implemented.");
    else toast.error("Cannot edit an application that is already being processed.");
  };

  const handleAddReview = (app) => {
    console.log(app, reviewingApp);

    setReviewingApp(app);
    setShowReviewModal(true);
  };

  if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <>
      <Card>
        <CardHeader><CardTitle>My Applications</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>University</TableHead><TableHead>Subject</TableHead><TableHead>Degree</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell className="font-medium">{app.universityName}</TableCell>
                  <TableCell>{app.subjectCategory}</TableCell>
                  <TableCell>{app.applicantApplyingDegree}</TableCell>
                  <TableCell><Badge className={getStatusColor(app.status)}>{app.status}</Badge></TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {/* Details button can open a modal if needed */}
                      <Button variant="outline" size="icon" onClick={() => handleEdit(app)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" onClick={() => cancelMutation.mutate(app._id)} disabled={app.status === 'rejected'}><X className="h-4 w-4" /></Button>
                      <Button variant="outline" size="icon" onClick={() => handleAddReview(app)}><MessageSquare className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {applications.length === 0 && <p className="text-center text-gray-500 py-8">You have not applied to any scholarships yet.</p>}
        </CardContent>
      </Card>
      {showReviewModal && <AddReviewModal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} application={reviewingApp} />}
    </>
  );
};
export default MyApplications;