
import { useState } from "react";
import { Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    universityName: "Harvard University",
    subjectCategory: "Engineering",
    reviewerName: "John Smith",
    reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-15",
    rating: 5,
    comment: "Excellent scholarship program with great support and opportunities."
  },
  {
    id: 2,
    universityName: "Oxford University",
    subjectCategory: "Medicine",
    reviewerName: "Sarah Johnson",
    reviewerImage: "https://images.unsplash.com/photo-1494790108755-2616b332c1a9?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-10",
    rating: 4,
    comment: "Good program but the application process could be improved."
  },
  {
    id: 3,
    universityName: "MIT",
    subjectCategory: "Engineering",
    reviewerName: "Michael Chen",
    reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-08",
    rating: 5,
    comment: "Outstanding university with world-class facilities and faculty."
  },
  {
    id: 4,
    universityName: "Stanford University",
    subjectCategory: "Business",
    reviewerName: "Emily Davis",
    reviewerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-05",
    rating: 4,
    comment: "Great networking opportunities and innovative curriculum."
  },
  {
    id: 5,
    universityName: "Cambridge University",
    subjectCategory: "Literature",
    reviewerName: "David Wilson",
    reviewerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-03",
    rating: 5,
    comment: "Rich history and excellent academic environment."
  },
  {
    id: 6,
    universityName: "ETH Zurich",
    subjectCategory: "Engineering",
    reviewerName: "Lisa Anderson",
    reviewerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-01",
    rating: 4,
    comment: "Strong research focus and international community."
  }
];

const AllReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    toast.success("Review deleted successfully");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-blue-700">{review.universityName}</h4>
                      <p className="text-sm text-gray-600">{review.subjectCategory}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.reviewerImage} alt={review.reviewerName} />
                        <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{review.reviewerName}</p>
                        <p className="text-xs text-gray-500">{review.reviewDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
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
                      <span className="text-sm text-gray-600 ml-2">({review.rating})</span>
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-3">{review.comment}</p>
                    
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(review.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllReviews;