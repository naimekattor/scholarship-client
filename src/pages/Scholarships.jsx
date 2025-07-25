import { useState, useEffect } from "react";
import { Search, Filter, Star, MapPin, Loader2, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from 'use-debounce';

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [filters, setFilters] = useState({ degree: 'all', subject: 'all' });
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['scholarships', page, debouncedSearchTerm, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit: 9,
      });
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (filters.degree !== 'all') params.append('degree', filters.degree);
      if (filters.subject !== 'all') params.append('subjectCategory', filters.subject);

      const res = await axios.get(`http://localhost:5000/api/scholarships?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="bg-gray-50">
      <div className="bg-gradient-to-r from-[#009b5d] to-[#009b5d]/70 text-white py-16">
        <div className="max-w-7xl mx-auto px-4"><div className="text-center"><h1 className="text-4xl md:text-5xl font-bold mb-4">All Scholarships</h1><p className="text-lg text-blue-100">Discover opportunities from universities worldwide</p></div></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2 lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Scholarships</label>
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" /><Input type="text" placeholder="Search by university, degree..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
              <Select value={filters.degree} onValueChange={(value) => handleFilterChange('degree', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Degrees</SelectItem><SelectItem value="Diploma">Diploma</SelectItem><SelectItem value="Bachelor">Bachelor</SelectItem><SelectItem value="Masters">Masters</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Select value={filters.subject} onValueChange={(value) => handleFilterChange('subject', value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Subjects</SelectItem><SelectItem value="Agriculture">Agriculture</SelectItem><SelectItem value="Engineering">Engineering</SelectItem><SelectItem value="Doctor">Doctor</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-12 w-12 animate-spin text-[#009b5d]" /></div>
        ) : scholarships.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((s) => (
                <Card key={s._id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <CardHeader className="p-0"><img src={s.universityLogo} alt={s.universityName} className="w-full h-48 object-cover rounded-t-lg" /></CardHeader>
                  <CardContent className="p-4 flex-grow"><Badge className="mb-2">{s.scholarshipCategory}</Badge><CardTitle className="text-lg mb-2">{s.scholarshipName}</CardTitle><p className="font-semibold text-md mb-3">{s.universityName}</p><div className="space-y-2 text-sm text-gray-600"><div className="flex items-center"><MapPin className="h-4 w-4 mr-2" />{s.universityCity}, {s.universityCountry}</div><div className="flex items-center"><Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />{s.averageRating.toFixed(1)}/5.0 ({s.reviews.length} reviews)</div></div></CardContent>
                  <CardFooter className="p-4 pt-0"><Button asChild className="w-full bg-[#009b5d] hover:bg-[#009b5d]/70"><Link to={`/scholarship/${s._id}`}>View Details</Link></Button></CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button variant="outline" size="sm" onClick={() => setPage(1)} disabled={page === 1}><ChevronsLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="h-4 w-4" /></Button>
              <span className="text-sm font-medium">Page {page} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}><ChevronsRight className="h-4 w-4" /></Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16"><h3 className="text-xl font-semibold text-gray-900 mb-2">No Scholarships Found</h3><p className="text-gray-600">Try adjusting your search criteria.</p></div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;