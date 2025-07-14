import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: null,
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    description: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, universityImage: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      'scholarshipName', 'universityName', 'universityCountry', 'universityCity',
      'subjectCategory', 'scholarshipCategory', 'degree', 'applicationFees',
      'serviceCharge', 'applicationDeadline', 'scholarshipPostDate'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]); // Removed type assertion 'as keyof typeof formData'

    if (missingFields.length > 0 || !formData.universityImage) {
      toast.error("Please fill in all required fields and upload university image");
      return;
    }

    try {
      // Mock scholarship creation
      console.log("Creating scholarship:", formData);
      toast.success("Scholarship added successfully!");

      // Reset form
      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: null,
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        scholarshipPostDate: "",
        description: ""
      });

    } catch (error) {
      toast.error("Failed to add scholarship. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Scholarship</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scholarshipName">Scholarship Name *</Label>
              <Input
                id="scholarshipName"
                value={formData.scholarshipName}
                onChange={(e) => handleInputChange('scholarshipName', e.target.value)}
                placeholder="Enter scholarship name"
                required
              />
            </div>

            <div>
              <Label htmlFor="universityName">University Name *</Label>
              <Input
                id="universityName"
                value={formData.universityName}
                onChange={(e) => handleInputChange('universityName', e.target.value)}
                placeholder="Enter university name"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="universityImage">University Image/Logo *</Label>
            <Input
              id="universityImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="universityCountry">University Country *</Label>
              <Input
                id="universityCountry"
                value={formData.universityCountry}
                onChange={(e) => handleInputChange('universityCountry', e.target.value)}
                placeholder="Enter country"
                required
              />
            </div>

            <div>
              <Label htmlFor="universityCity">University City *</Label>
              <Input
                id="universityCity"
                value={formData.universityCity}
                onChange={(e) => handleInputChange('universityCity', e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="universityWorldRank">University World Rank</Label>
            <Input
              id="universityWorldRank"
              type="number"
              value={formData.universityWorldRank}
              onChange={(e) => handleInputChange('universityWorldRank', e.target.value)}
              placeholder="Enter world rank"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Subject Category *</Label>
              <Select value={formData.subjectCategory} onValueChange={(value) => handleInputChange('subjectCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Scholarship Category *</Label>
              <Select value={formData.scholarshipCategory} onValueChange={(value) => handleInputChange('scholarshipCategory', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Fund">Full Fund</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Self-fund">Self-fund</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Degree *</Label>
              <Select value={formData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="tuitionFees">Tuition Fees (Optional)</Label>
              <Input
                id="tuitionFees"
                type="number"
                value={formData.tuitionFees}
                onChange={(e) => handleInputChange('tuitionFees', e.target.value)}
                placeholder="Enter tuition fees"
              />
            </div>

            <div>
              <Label htmlFor="applicationFees">Application Fees *</Label>
              <Input
                id="applicationFees"
                type="number"
                value={formData.applicationFees}
                onChange={(e) => handleInputChange('applicationFees', e.target.value)}
                placeholder="Enter application fees"
                required
              />
            </div>

            <div>
              <Label htmlFor="serviceCharge">Service Charge *</Label>
              <Input
                id="serviceCharge"
                type="number"
                value={formData.serviceCharge}
                onChange={(e) => handleInputChange('serviceCharge', e.target.value)}
                placeholder="Enter service charge"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="applicationDeadline">Application Deadline *</Label>
              <Input
                id="applicationDeadline"
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="scholarshipPostDate">Scholarship Post Date *</Label>
              <Input
                id="scholarshipPostDate"
                type="date"
                value={formData.scholarshipPostDate}
                onChange={(e) => handleInputChange('scholarshipPostDate', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Scholarship Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter scholarship description..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Add Scholarship
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddScholarship;