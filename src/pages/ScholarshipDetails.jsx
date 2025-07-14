import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, MapPin, Calendar, DollarSign, BookOpen, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for scholarship details
const scholarshipDetails = {
  id: 1,
  universityName: "Harvard University",
  universityImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=400&fit=crop",
  category: "Full Fund",
  location: "Cambridge, USA",
  deadline: "2024-03-15",
  subject: "Engineering",
  description: "This scholarship provides full funding for international students pursuing engineering degrees at Harvard University. The program covers tuition, living expenses, and research opportunities.",
  stipend: 5000,
  postDate: "2024-01-15",
  serviceCharge: 100,
  applicationFee: 50,
  rating: 4.8,
};

// Mock reviews data
const reviews = [
  {
    id: 1,
    reviewerName: "John Smith",
    reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-10",
    rating: 5,
    comment: "Excellent scholarship program! The application process was smooth and the support was outstanding."
  },
  {
    id: 2,
    reviewerName: "Sarah Johnson",
    reviewerImage: "https://images.unsplash.com/photo-1494790108755-2616b332c1a9?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-08",
    rating: 4,
    comment: "Great opportunity for students. The scholarship covers most expenses and the university is top-notch."
  },
  {
    id: 3,
    reviewerName: "Michael Chen",
    reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    reviewDate: "2024-01-05",
    rating: 5,
    comment: "Life-changing opportunity! Highly recommend applying for this scholarship."
  }
];

const ScholarshipDetails = () => {
  const { id } = useParams();

  const handleApplyScholarship = () => {
    // Redirect to application/payment page
    window.location.href = `/apply-scholarship/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button variant="outline" asChild className="mb-6">
          <Link to="/scholarships">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Scholarships
          </Link>
        </Button>

        {/* Scholarship Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader className="p-0">
                <img
                  src={scholarshipDetails.universityImage}
                  alt={scholarshipDetails.universityName}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-600 hover:bg-blue-700">
                    {scholarshipDetails.category}
                  </Badge>
                  <Badge variant="outline">{scholarshipDetails.subject}</Badge>
                </div>
                
                <CardTitle className="text-3xl mb-4">{scholarshipDetails.universityName}</CardTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    {scholarshipDetails.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    Deadline: {scholarshipDetails.deadline}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Subject: {scholarshipDetails.subject}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />
                    {scholarshipDetails.rating} Rating
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {scholarshipDetails.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Stipend</h4>
                    <p className="text-2xl font-bold text-green-600">${scholarshipDetails.stipend}/month</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Posted Date</h4>
                    <p className="text-gray-700">{scholarshipDetails.postDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Student Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {reviews.map((review) => (
                      <CarouselItem key={review.id} className="md:basis-1/2">
                        <Card className="border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center mb-3">
                              <img
                                src={review.reviewerImage}
                                alt={review.reviewerName}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <h4 className="font-semibold">{review.reviewerName}</h4>
                                <p className="text-sm text-gray-500">{review.reviewDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center mb-2">
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
                            <p className="text-gray-700 text-sm">{review.comment}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-semibold">${scholarshipDetails.applicationFee}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-semibold">${scholarshipDetails.serviceCharge}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-bold text-lg">
                    ${scholarshipDetails.applicationFee + scholarshipDetails.serviceCharge}
                  </span>
                </div>
                
                <Button 
                  onClick={handleApplyScholarship}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                >
                  Apply for Scholarship
                </Button>
                
                <p className="text-sm text-gray-500 text-center">
                  You will be redirected to the application form and payment page
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipDetails;