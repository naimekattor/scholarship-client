import { useContext, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const AddReviewModal = ({ isOpen, onClose, application }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useContext(AuthContext);
  console.log(user);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    // Mock review submission
    const reviewData = {
      scholarshipName: `${application?.universityName} Scholarship`,
      universityName: application?.universityName,
      rating,
      comment,
      reviewDate: new Date().toISOString().split('T')[0],
      userName: user?.name,
      userEmail: user?.email
    };
    axios.post(`http://localhost:5000/api/reviews/${application.scholarshipId}`, reviewData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        console.log("Review submitted:", res.data);

      }).catch(err => {
        console.log(err);

      })

    console.log("Submitting review:", reviewData);
    toast.success("Review submitted successfully!");

    // Reset form
    setRating(0);
    setComment("");
    onClose();
  };

  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>University Name</Label>
            <Input value={application.universityName} readOnly className="bg-gray-100" />
          </div>

          <div>
            <Label>Scholarship Name</Label>
            <Input value={`${application.universityName} Scholarship`} readOnly className="bg-gray-100" />
          </div>

          <div>
            <Label>Rating *</Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                    }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Review Comment *</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;