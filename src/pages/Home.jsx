import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Search, Star, MapPin, Calendar, DollarSign, ChevronRight, BookOpen, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";

// Mock data for scholarships
const topScholarships = [
  {
    id: 1,
    universityName: "Harvard University",
    universityImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    category: "Full Fund",
    location: "Cambridge, USA",
    deadline: "2024-03-15",
    subject: "Engineering",
    applicationFee: 50,
    rating: 4.8,
  },
  {
    id: 2,
    universityName: "Oxford University",
    universityImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
    category: "Partial",
    location: "Oxford, UK",
    deadline: "2024-04-20",
    subject: "Medicine",
    applicationFee: 75,
    rating: 4.9,
  },
  {
    id: 3,
    universityName: "MIT",
    universityImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    category: "Full Fund",
    location: "Boston, USA",
    deadline: "2024-02-28",
    subject: "Engineering",
    applicationFee: 60,
    rating: 4.7,
  },
  {
    id: 4,
    universityName: "Stanford University",
    universityImage: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
    category: "Partial",
    location: "California, USA",
    deadline: "2024-05-10",
    subject: "Business",
    applicationFee: 80,
    rating: 4.6,
  },
  {
    id: 5,
    universityName: "Cambridge University",
    universityImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
    category: "Full Fund",
    location: "Cambridge, UK",
    deadline: "2024-03-30",
    subject: "Literature",
    applicationFee: 55,
    rating: 4.8,
  },
  {
    id: 6,
    universityName: "ETH Zurich",
    universityImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop",
    category: "Self-fund",
    location: "Zurich, Switzerland",
    deadline: "2024-06-15",
    subject: "Engineering",
    applicationFee: 45,
    rating: 4.5,
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Scholarship</h2>
          <p className="text-lg text-gray-600 mb-8">Search from thousands of scholarships worldwide</p>
        </div>
        
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by university, scholarship, or degree..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-3 text-lg"
          />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            Search
          </Button>
        </div>
      </section>

      {/* Top Scholarships Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Scholarships</h2>
          <p className="text-lg text-gray-600">Most popular scholarships with low application fees</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                    {scholarship.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{scholarship.universityName}</CardTitle>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {scholarship.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Deadline: {scholarship.deadline}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {scholarship.subject}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Application Fee: ${scholarship.applicationFee}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                    {scholarship.rating} Rating
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link to={`/scholarship/${scholarship.id}`}>
                    View Details <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/scholarships">
              View All Scholarships <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl opacity-90">Trusted by thousands of students worldwide</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1,000+</h3>
              <p className="opacity-90">Scholarships Available</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50,000+</h3>
              <p className="opacity-90">Students Helped</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="opacity-90">Partner Universities</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">95%</h3>
              <p className="opacity-90">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Universities</h2>
          <p className="text-lg text-gray-600">Top-ranked institutions offering scholarships</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: "Harvard", logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=150&h=150&fit=crop" },
            { name: "Oxford", logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=150&h=150&fit=crop" },
            { name: "MIT", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=150&h=150&fit=crop" },
            { name: "Stanford", logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=150&h=150&fit=crop" },
            { name: "Cambridge", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=150&h=150&fit=crop" },
            { name: "ETH Zurich", logo: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=150&h=150&fit=crop" },
          ].map((uni, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="bg-white rounded-full w-24 h-24 mx-auto mb-3 shadow-md group-hover:shadow-lg transition-shadow flex items-center justify-center overflow-hidden">
                <img src={uni.logo} alt={uni.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{uni.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
