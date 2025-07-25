import { Link } from "react-router";
import { Star, MapPin, Calendar, DollarSign, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroBanner from "@/components/HeroBanner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BorderBeam } from './../components/magicui/border-beam';

const ScholarshipCard = ({ scholarship }) => (
  <Card className="relative hover:shadow-lg transition-shadow duration-300 border-0 shadow-md flex flex-col py-0">
    <CardHeader className="p-0">
      <img src={scholarship.universityLogo} alt={scholarship.universityName} className="w-full h-full object-cover rounded-t-lg" />
    </CardHeader>
    <CardContent className="p-4 flex-grow">
      <Badge className="mb-2">{scholarship.scholarshipCategory}</Badge>
      <CardTitle className="text-lg mb-2">{scholarship.scholarshipName}</CardTitle>
      <p className="font-semibold text-md mb-3">{scholarship.universityName}</p>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{scholarship.universityCity}, {scholarship.universityCountry}</div>
        <div className="flex items-center"><BookOpen className="h-4 w-4 mr-2" />{scholarship.subjectCategory} ({scholarship.degree})</div>
        <div className="flex items-center"><DollarSign className="h-4 w-4 mr-2" />Fees: ${scholarship.applicationFees}</div>
        <div className="flex items-center"><Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />{scholarship.averageRating.toFixed(1)}/5.0</div>
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button asChild className="w-full bg-[#009b5d] hover:bg-[#009b5d] font-bold">
        <Link to={`/scholarship/${scholarship._id}`}>View Details <ChevronRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </CardFooter>
    <BorderBeam
      duration={6}
      size={400}
      className="from-transparent via-red-500 to-transparent"
    />
    <BorderBeam
      duration={6}
      delay={3}
      size={400}
      borderWidth={2}
      className="from-transparent via-[#009b5d] to-transparent"
    />
  </Card>
);

const Home = () => {
  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ['topScholarships'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/api/scholarships?sort=top&limit=6');
      return res.data.scholarships;
    }
  });

  return (
    <div>
      <HeroBanner />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Scholarships</h2>
          <p className="text-lg text-gray-600">Most popular scholarships with low application fees</p>
        </div>
        {isLoading ? (
          <div className="flex justify-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {topScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/scholarships">
            <Button size="lg" className="bg-white text-[#009b5d]  relative font-bold">
              View All Scholarships
              <ChevronRight className="ml-2 h-5 w-5" />
              <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
              <BorderBeam duration={6} delay={3} size={400} borderWidth={2} className="from-transparent via-[#009b5d] to-transparent" />
            </Button>
          </Link>


        </div>
      </section>
      {/* You can add your other static sections back here */}
    </div>
  );
};

export default Home;