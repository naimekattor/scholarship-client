import { useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Mock scholarships data
const mockScholarships = [
  {
    id: 1,
    scholarshipName: "Engineering Excellence Scholarship",
    universityName: "Harvard University",
    subjectCategory: "Engineering",
    degree: "Masters",
    applicationFees: 50
  },
  {
    id: 2,
    scholarshipName: "Medical Research Scholarship",
    universityName: "Oxford University",
    subjectCategory: "Medicine",
    degree: "Bachelor",
    applicationFees: 75
  },
  {
    id: 3,
    scholarshipName: "Technology Innovation Scholarship",
    universityName: "MIT",
    subjectCategory: "Engineering",
    degree: "Masters",
    applicationFees: 60
  }
];

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState(mockScholarships);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [editForm, setEditForm] = useState({
    scholarshipName: "",
    universityName: "",
    subjectCategory: "",
    degree: "",
    applicationFees: 0
  });

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setEditForm({
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      subjectCategory: scholarship.subjectCategory,
      degree: scholarship.degree,
      applicationFees: scholarship.applicationFees
    });
  };

  const handleDelete = (scholarshipId) => {
    setScholarships(scholarships.filter(s => s.id !== scholarshipId));
    toast.success("Scholarship deleted successfully");
  };

  const handleUpdateScholarship = (e) => {
    e.preventDefault();
    
    setScholarships(scholarships.map(s => 
      s.id === editingScholarship.id 
        ? { ...s, ...editForm }
        : s
    ));
    
    toast.success("Scholarship updated successfully");
    setEditingScholarship(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Scholarships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scholarship Name</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Degree</TableHead>
                  <TableHead>Application Fees</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarships.map((scholarship) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="font-medium">{scholarship.scholarshipName}</TableCell>
                    <TableCell>{scholarship.universityName}</TableCell>
                    <TableCell>{scholarship.subjectCategory}</TableCell>
                    <TableCell>{scholarship.degree}</TableCell>
                    <TableCell>${scholarship.applicationFees}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(scholarship)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(scholarship.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Scholarship Modal */}
      <Dialog open={editingScholarship !== null} onOpenChange={() => setEditingScholarship(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Scholarship</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleUpdateScholarship} className="space-y-4">
            <div>
              <Label htmlFor="scholarshipName">Scholarship Name</Label>
              <Input
                id="scholarshipName"
                value={editForm.scholarshipName}
                onChange={(e) => setEditForm({ ...editForm, scholarshipName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="universityName">University Name</Label>
              <Input
                id="universityName"
                value={editForm.universityName}
                onChange={(e) => setEditForm({ ...editForm, universityName: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label>Subject Category</Label>
              <Select 
                value={editForm.subjectCategory} 
                onValueChange={(value) => setEditForm({ ...editForm, subjectCategory: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Degree</Label>
              <Select 
                value={editForm.degree} 
                onValueChange={(value) => setEditForm({ ...editForm, degree: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Masters">Masters</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="applicationFees">Application Fees</Label>
              <Input
                id="applicationFees"
                type="number"
                value={editForm.applicationFees}
                onChange={(e) => setEditForm({ ...editForm, applicationFees: parseInt(e.target.value) })}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditingScholarship(null)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Update Scholarship
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageScholarships;