import { useState } from "react";
import { Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    scholarshipName: "Harvard Engineering Scholarship",
    universityName: "Harvard University",
    comment: "Excellent scholarship program with great support.",
    reviewDate: "2024-01-15",
    rating: 5
  },
  {
    id: 2,
    scholarshipName: "Oxford Medicine Scholarship",
    universityName: "Oxford University",
    comment: "Good opportunity but application process is lengthy.",
    reviewDate: "2024-01-10",
    rating: 4
  }
];

const MyReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({ rating: 0, comment: "" });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleEdit = (review) => {
    setEditingReview(review);
    setEditForm({ rating: review.rating, comment: review.comment });
  };

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    toast.success("Review deleted successfully");
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    
    if (editForm.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    
    if (!editForm.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setReviews(reviews.map(review => 
      review.id === editingReview.id 
        ? { ...review, rating: editForm.rating, comment: editForm.comment }
        : review
    ));
    
    toast.success("Review updated successfully");
    setEditingReview(null);
    setEditForm({ rating: 0, comment: "" });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scholarship Name</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">{review.scholarshipName}</TableCell>
                    <TableCell>{review.universityName}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                    <TableCell>{review.reviewDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(review)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Edit Review Modal */}
      <Dialog open={editingReview !== null} onOpenChange={() => setEditingReview(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpdateReview} className="space-y-4">
            <div>
              <Label>Scholarship Name</Label>
              <Input value={editingReview?.scholarshipName || ""} readOnly className="bg-gray-100" />
            </div>
            
            <div>
              <Label>University Name</Label>
              <Input value={editingReview?.universityName || ""} readOnly className="bg-gray-100" />
            </div>
            
            <div>
              <Label>Rating *</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      star <= (hoveredRating || editForm.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setEditForm({ ...editForm, rating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="editComment">Review Comment *</Label>
              <Textarea
                id="editComment"
                value={editForm.comment}
                onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                placeholder="Write your review here..."
                rows={4}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditingReview(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update Review
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReviews;