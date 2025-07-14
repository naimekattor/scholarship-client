import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, Calendar, DollarSign, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data - expanded scholarship list
const scholarships = [
  {
    id: 1,
    universityName: "Harvard University",
    universityImage: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
    category: "Full Fund",
    location: "Cambridge, USA",
    deadline: "2024-03-15",
    subject: "Engineering",
    degree: "Masters",
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
    degree: "Bachelor",
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
    degree: "Diploma",
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
    degree: "Masters",
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
    degree: "Bachelor",
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
    degree: "Masters",
    applicationFee: 45,
    rating: 4.5,
  },
  {
    id: 7,
    universityName: "University of Tokyo",
    universityImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    category: "Partial",
    location: "Tokyo, Japan",
    deadline: "2024-04-30",
    subject: "Technology",
    degree: "Masters",
    applicationFee: 40,
    rating: 4.4,
  },
  {
    id: 8,
    universityName: "University of Melbourne",
    universityImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop",
    category: "Full Fund",
    location: "Melbourne, Australia",
    deadline: "2024-05-20",
    subject: "Agriculture",
    degree: "Diploma",
    applicationFee: 65,
    rating: 4.3,
  },
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);

  const handleSearch = () => {
    let filtered = scholarships;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(
        scholarship =>
          scholarship.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.degree.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(scholarship => 
        scholarship.category.toLowerCase().replace(' ', '-') === categoryFilter
      );
    }

    // Degree filter
    if (degreeFilter !== "all") {
      filtered = filtered.filter(scholarship => 
        scholarship.degree.toLowerCase() === degreeFilter
      );
    }

    // Subject filter
    if (subjectFilter !== "all") {
      filtered = filtered.filter(scholarship => 
        scholarship.subject.toLowerCase() === subjectFilter
      );
    }

    setFilteredScholarships(filtered);
  };

  // Auto-search when filters change
  useEffect(() => {
    handleSearch();
  }, [searchTerm, categoryFilter, degreeFilter, subjectFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">All Scholarships</h1>
            <p className="text-lg text-blue-100">
              Discover thousands of scholarship opportunities from universities worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search Box */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Scholarships
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by university, scholarship, or degree..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="full-fund">Full Fund</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="self-fund">Self Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Degrees</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Filter className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredScholarships.length} of {scholarships.length} scholarships
          </p>
        </div>

        {/* Scholarship Grid */}
        {filteredScholarships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => (
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
                    <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">
                      {scholarship.degree}
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
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <img 
                src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=300&h=200&fit=crop" 
                alt="No results found" 
                className="mx-auto mb-6 rounded-lg opacity-50"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scholarships Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or browse all available scholarships.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setDegreeFilter("all");
                  setSubjectFilter("all");
                  setFilteredScholarships(scholarships);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Scholarships;