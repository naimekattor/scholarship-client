import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const IMGBB_API_KEY = 'ca6cf0c85991e33bc35ee0a50881908e'; 

const AddScholarship = () => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: (newScholarship) => axiosSecure.post('/scholarships', newScholarship),
    onSuccess: () => {
      toast.success("Scholarship added successfully!");
      queryClient.invalidateQueries({ queryKey: ['scholarships'] });
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add scholarship.");
    }
  });

  const onSubmit = async (data) => {
    const imageFile = { image: data.universityLogo[0] };
    try {
      const imgbbResponse = await toast.promise(
        axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imageFile, { headers: { 'Content-Type': 'multipart/form-data' } }),
        { loading: 'Uploading logo...', success: 'Logo uploaded!', error: 'Could not upload logo.' }
      );

      if (imgbbResponse.data.success) {
        const scholarshipData = {
          ...data,
          universityLogo: imgbbResponse.data.data.display_url,
          postedUserEmail: user.email,
          applicationFees: parseFloat(data.applicationFees),
          serviceCharge: parseFloat(data.serviceCharge),
          universityWorldRank: data.universityWorldRank ? parseInt(data.universityWorldRank) : undefined,
          tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : undefined,
        };
        mutation.mutate(scholarshipData);
      }
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Add New Scholarship</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="scholarshipName">Scholarship Name *</Label><Input id="scholarshipName" {...register("scholarshipName", { required: true })} /></div>
            <div><Label htmlFor="universityName">University Name *</Label><Input id="universityName" {...register("universityName", { required: true })} /></div>
          </div>
          <div><Label htmlFor="universityLogo">University Logo *</Label><Input id="universityLogo" type="file" {...register("universityLogo", { required: true })} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>University Country *</Label><Input {...register("universityCountry", { required: true })} /></div>
            <div><Label>University City *</Label><Input {...register("universityCity", { required: true })} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><Label>Subject Category *</Label><Controller name="subjectCategory" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent><SelectItem value="Agriculture">Agriculture</SelectItem><SelectItem value="Engineering">Engineering</SelectItem><SelectItem value="Doctor">Doctor</SelectItem></SelectContent></Select> )}/></div>
            <div><Label>Scholarship Category *</Label><Controller name="scholarshipCategory" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent><SelectItem value="Full fund">Full Fund</SelectItem><SelectItem value="Partial">Partial</SelectItem><SelectItem value="Self-fund">Self-fund</SelectItem></SelectContent></Select> )}/></div>
            <div><Label>Degree *</Label><Controller name="degree" control={control} rules={{ required: true }} render={({ field }) => ( <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent><SelectItem value="Diploma">Diploma</SelectItem><SelectItem value="Bachelor">Bachelor</SelectItem><SelectItem value="Masters">Masters</SelectItem></SelectContent></Select> )}/></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Application Fees *</Label><Input type="number" step="0.01" {...register("applicationFees", { required: true })} /></div>
            <div><Label>Service Charge *</Label><Input type="number" step="0.01" {...register("serviceCharge", { required: true })} /></div>
          </div>
          <div><Label>Stipend (Optional)</Label><Input type="text" placeholder="e.g., 500/month" {...register("stipend")} /></div>
          <div><Label>Application Deadline *</Label><Input type="date" {...register("deadline", { required: true })} /></div>
          {/* CORRECTED: ADDED THE REQUIRED DESCRIPTION TEXTAREA */}
          <div>
            <Label htmlFor="description">Scholarship Description *</Label>
            <Textarea id="description" placeholder="Enter scholarship description..." {...register("description", { required: "Description is required." })} rows={4}/>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={mutation.isLoading}>
            {mutation.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Add Scholarship'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default AddScholarship;