import { useParams, Link, useNavigate } from "react-router";
import { Star, MapPin, Calendar, DollarSign, BookOpen, ArrowLeft, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-blue-600" /></div>;
  }

  if (!scholarship) {
    return <div className="text-center py-16">Scholarship not found.</div>;
  }

  const { universityLogo, universityName, scholarshipCategory, subjectCategory, universityCity, universityCountry, deadline, description, stipend, postDate, applicationFees, serviceCharge, averageRating, reviews } = scholarship;

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" asChild className="mb-6"><Link to="/scholarships"><ArrowLeft className="mr-2 h-4 w-4" />Back to All Scholarships</Link></Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader className="p-0"><img src={universityLogo} alt={universityName} className="w-full h-64 object-cover rounded-t-lg" /></CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4"><Badge className="bg-[#009b5d] hover:bg-[#009b5d]/70">{scholarshipCategory}</Badge><Badge variant="outline">{subjectCategory}</Badge></div>
                <CardTitle className="text-3xl mb-4">{scholarship.scholarshipName}</CardTitle>
                <p className="text-xl font-semibold mb-4">{universityName}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600"><MapPin className="h-5 w-5 mr-2" />{universityCity}, {universityCountry}</div>
                  <div className="flex items-center text-gray-600"><Calendar className="h-5 w-5 mr-2" />Deadline: {new Date(deadline).toLocaleDateString()}</div>
                  <div className="flex items-center text-gray-600"><BookOpen className="h-5 w-5 mr-2" />Subject: {subjectCategory}</div>
                  <div className="flex items-center text-gray-600"><Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />{averageRating.toFixed(1)} Rating</div>
                </div>
                <div className="mb-6"><h3 className="text-xl font-semibold mb-3">Description</h3><p className="text-gray-700 leading-relaxed">{description}</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg"><h4 className="font-semibold text-gray-900 mb-2">Stipend</h4><p className="text-2xl font-bold text-green-600">{stipend ? `$${stipend}/month` : "N/A"}</p></div>
                  <div className="bg-gray-100 p-4 rounded-lg"><h4 className="font-semibold text-gray-900 mb-2">Posted Date</h4><p className="text-gray-700">{new Date(postDate).toLocaleDateString()}</p></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5" />Student Reviews ({reviews.length})</CardTitle></CardHeader>
              <CardContent>
                {reviews && reviews.length > 0 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {reviews.map((review) => (
                        <CarouselItem key={review._id} className="md:basis-1/2 lg:basis-1/3"><Card className="h-full"><CardContent className="p-4"><div className="flex items-center mb-3"><div className="flex-1"><h4 className="font-semibold">{review.userId.name}</h4><p className="text-sm text-gray-500">{new Date(review.reviewDate).toLocaleDateString()}</p></div></div><div className="flex items-center mb-2">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />))}</div><p className="text-gray-700 text-sm">{review.reviewComment}</p></CardContent></Card></CarouselItem>
                      ))}
                    </CarouselContent><CarouselPrevious /><CarouselNext />
                  </Carousel>
                ) : <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle>Application Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b"><span className="text-gray-600">Application Fee</span><span className="font-semibold">${applicationFees}</span></div>
                <div className="flex justify-between items-center py-2 border-b"><span className="text-gray-600">Service Charge</span><span className="font-semibold">${serviceCharge}</span></div>
                <div className="flex justify-between items-center py-2 border-b"><span className="text-gray-600">Total Amount</span><span className="font-bold text-lg">${applicationFees + serviceCharge}</span></div>
                <Button onClick={() => navigate(`/apply-scholarship/${id}`)} className="w-full bg-[#009b5d] hover:bg-[#009b5d]/70 text-lg py-3">Apply Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScholarshipDetails;