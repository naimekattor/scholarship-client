import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios"; // We need the plain axios for the public ImgBB API
import useAxiosSecure from "@/hooks/useAxiosSecure"; // <-- IMPORT THE SECURE HOOK
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

// IMPORTANT: Go to https://api.imgbb.com/ to get your free API key
const IMGBB_API_KEY = 'ca6cf0c85991e33bc35ee0a50881908e';

const AddScholarship = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure(); // <-- USE THE SECURE HOOK
  const { user } = useAuth(); // Get logged-in user info

  // Use react-query's useMutation for clean API state handling (isLoading, etc.)
  const mutation = useMutation({
    mutationFn: (newScholarship) => {
      // Use the *secure* axios instance to make the request to your backend
      return axiosSecure.post('/scholarships', newScholarship); 
    },
    onSuccess: () => {
      toast.success("Scholarship added successfully!");
      queryClient.invalidateQueries({ queryKey: ['scholarships'] }); // Refetch data on other pages
      reset(); // Clear the form after successful submission
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add scholarship.");
    }
  });

  const onSubmit = async (data) => {
    // Step 1: Upload the image file to ImgBB
    const imageFile = { image: data.universityLogo[0] };
    try {
        const imgbbResponse = await toast.promise(
            axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imageFile, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }),
            {
                loading: 'Uploading university logo...',
                success: 'Logo uploaded!',
                error: 'Could not upload logo.',
            }
        );

        if (imgbbResponse.data.success) {
            // Step 2: Create the scholarship data object with the image URL
            const scholarshipData = {
                ...data,
                universityLogo: imgbbResponse.data.data.display_url,
                postedUserEmail: user.email,
                applicationFees: parseFloat(data.applicationFees),
                serviceCharge: parseFloat(data.serviceCharge),
                // Ensure other numeric fields are also parsed if needed
                universityWorldRank: data.universityWorldRank ? parseInt(data.universityWorldRank) : null,
                tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : null,
            };
            
            // Step 3: Call the mutation to send data to your secure backend
            mutation.mutate(scholarshipData);
        }
    } catch (error) {
        console.error("Image upload failed", error);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Add New Scholarship</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Using react-hook-form's register function */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="scholarshipName">Scholarship Name *</Label><Input id="scholarshipName" {...register("scholarshipName", { required: "Name is required" })} /> {errors.scholarshipName && <p className="text-red-500 text-sm">{errors.scholarshipName.message}</p>}</div>
                <div><Label htmlFor="universityName">University Name *</Label><Input id="universityName" {...register("universityName", { required: "University is required" })} />{errors.universityName && <p className="text-red-500 text-sm">{errors.universityName.message}</p>}</div>
            </div>
            <div><Label htmlFor="universityLogo">University Logo *</Label><Input id="universityLogo" type="file" {...register("universityLogo", { required: "Logo is required" })} />{errors.universityLogo && <p className="text-red-500 text-sm">{errors.universityLogo.message}</p>}</div>
            
            {/* Other form fields */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* For Select components with react-hook-form, use Controller */}
                <div><Label>Subject Category *</Label><Controller name="subjectCategory" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger> <SelectContent><SelectItem value="Agriculture">Agriculture</SelectItem><SelectItem value="Engineering">Engineering</SelectItem><SelectItem value="Doctor">Doctor</SelectItem></SelectContent></Select> )} /></div>
                <div><Label>Scholarship Category *</Label><Controller name="scholarshipCategory" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger> <SelectContent><SelectItem value="Full fund">Full Fund</SelectItem><SelectItem value="Partial">Partial</SelectItem><SelectItem value="Self-fund">Self-fund</SelectItem></SelectContent></Select> )} /></div>
                <div><Label>Degree *</Label><Controller name="degree" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}> <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger> <SelectContent><SelectItem value="Diploma">Diploma</SelectItem><SelectItem value="Bachelor">Bachelor</SelectItem><SelectItem value="Masters">Masters</SelectItem></SelectContent></Select> )} /></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="applicationFees">Application Fees *</Label><Input id="applicationFees" type="number" step="0.01" {...register("applicationFees", { required: true })} /></div>
                <div><Label htmlFor="serviceCharge">Service Charge *</Label><Input id="serviceCharge" type="number" step="0.01" {...register("serviceCharge", { required: true })} /></div>
             </div>
             
             <div><Label htmlFor="deadline">Application Deadline *</Label><Input id="deadline" type="date" {...register("deadline", { required: true })} /></div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={mutation.isLoading}>
                {mutation.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Scholarship'}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddScholarship;