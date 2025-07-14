import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const ApplyScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    photo: null, // Removed 'as File | null'
    address: "",
    gender: "",
    degree: "",
    sscResult: "",
    hscResult: "",
    studyGap: ""
  });

  const handleInputChange = (field, value) => { // Removed type annotations
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => { // Removed : React.ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files[0] })); // Removed '!'
    }
  };

  const handleSubmit = async (e) => { // Removed : React.FormEvent
    e.preventDefault();

    // Validate form
    const requiredFields = ['phone', 'address', 'gender', 'degree', 'sscResult', 'hscResult'];
    // Removed type assertion 'as keyof typeof formData'
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0 || !formData.photo) {
      toast.error("Please fill in all required fields and upload your photo");
      return;
    }

    try {
      // Simulate form submission
      console.log("Submitting application:", formData);

      // Simulate payment processing
      toast.success("Application submitted successfully! Redirecting to payment...");

      // Simulate payment redirect
      setTimeout(() => {
        navigate(`/payment-success`);
      }, 2000);

    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="photo">Applicant Photo *</Label>
                      <div className="mt-1">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address (Village, District, Country) *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Applying Degree *</Label>
                      <Select value={formData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="bachelor">Bachelor</SelectItem>
                          <SelectItem value="masters">Masters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sscResult">SSC Result *</Label>
                      <Input
                        id="sscResult"
                        value={formData.sscResult}
                        onChange={(e) => handleInputChange('sscResult', e.target.value)}
                        placeholder="Enter SSC result"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="hscResult">HSC Result *</Label>
                      <Input
                        id="hscResult"
                        value={formData.hscResult}
                        onChange={(e) => handleInputChange('hscResult', e.target.value)}
                        placeholder="Enter HSC result"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Study Gap (Optional)</Label>
                    <Select value={formData.studyGap} onValueChange={(value) => handleInputChange('studyGap', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select study gap if any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Gap</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="3years">3+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>University Name</Label>
                      <Input value="Harvard University" readOnly className="bg-gray-100" />
                    </div>

                    <div>
                      <Label>Scholarship Category</Label>
                      <Input value="Full Fund" readOnly className="bg-gray-100" />
                    </div>
                  </div>

                  <div>
                    <Label>Subject Category</Label>
                    <Input value="Engineering" readOnly className="bg-gray-100" />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Submit Application & Proceed to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Application Fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charge</span>
                    <span>$100</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>$150</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>• Secure payment processing</p>
                  <p>• Money-back guarantee</p>
                  <p>• 24/7 customer support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyScholarship;