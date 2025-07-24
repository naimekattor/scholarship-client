import { useNavigate, useParams } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

// This is your public ImgBB API key. You can get your own from imgbb.com
const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY';

const ApplyScholarship = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const { data: scholarship, isLoading: isScholarshipLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (applicationData) => axiosSecure.post(`/applications/${id}/apply`, applicationData),
    onSuccess: () => {
      toast.success("Application submitted successfully! Payment processing is simulated.");
      navigate('/user/dashboard'); // Redirect to dashboard after successful application
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to submit application.");
    }
  });

  const onSubmit = async (data) => {
    // 1. Upload image to ImgBB
    const imageFile = { image: data.applicantPhoto[0] };
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imageFile, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.data.success) {
      const applicationData = {
        ...data,
        applicantPhoto: res.data.data.display_url,
      };
      
      // Here you would typically integrate a payment gateway like Stripe.
      // For this project, we will simulate a successful payment and proceed.
      mutation.mutate(applicationData);
    } else {
        toast.error("Image upload failed. Please try again.");
    }
  };

  if (isScholarshipLoading) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Scholarship Application Form</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Personal Info */}
                  <Input type="tel" placeholder="Phone Number *" {...register("applicantPhone", { required: true })} />
                  <div><Label htmlFor="applicantPhoto">Applicant Photo *</Label><Input id="applicantPhoto" type="file" accept="image/*" {...register("applicantPhoto", { required: true })} /></div>
                  <Input placeholder="Address (Village, District, Country) *" {...register("applicantAddress", { required: true })} />
                  
                  {/* Dropdowns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Controller name="applicantGender" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger><SelectValue placeholder="Select Gender *" /></SelectTrigger> <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select> )} />
                     <Controller name="applicantApplyingDegree" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select Applying Degree *"/></SelectTrigger><SelectContent><SelectItem value="Diploma">Diploma</SelectItem><SelectItem value="Bachelor">Bachelor</SelectItem><SelectItem value="Masters">Masters</SelectItem></SelectContent></Select>)} />
                  </div>

                  {/* Academic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="SSC Result *" {...register("sscResult", { required: true })} />
                    <Input placeholder="HSC Result *" {...register("hscResult", { required: true })} />
                  </div>
                   <Controller name="studyGap" control={control} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Study Gap (Optional)"/></SelectTrigger><SelectContent><SelectItem value="none">No Gap</SelectItem><SelectItem value="1">1 Year</SelectItem><SelectItem value="2">2 Years</SelectItem><SelectItem value="3+">3+ Years</SelectItem></SelectContent></Select>)} />

                  {/* Read-only fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>University Name</Label><Input value={scholarship?.universityName} readOnly /></div>
                    <div><Label>Scholarship Category</Label><Input value={scholarship?.scholarshipCategory} readOnly /></div>
                  </div>
                  <div><Label>Subject Category</Label><Input value={scholarship?.subjectCategory} readOnly /></div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={mutation.isLoading}>
                    {mutation.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit & Proceed to Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader><CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" />Payment Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex justify-between"><span>Application Fee</span><span>${scholarship?.applicationFees}</span></div>
                  <div className="flex justify-between"><span>Service Charge</span><span>${scholarship?.serviceCharge}</span></div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${scholarship?.applicationFees + scholarship?.serviceCharge}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplyScholarship;