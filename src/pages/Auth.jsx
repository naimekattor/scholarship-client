import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setUser, googleSignIn, backendGoogleLogin } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!isLogin) {
      if (password.length < 6) return toast.error("Password must be at least 6 characters.");
      if (!/[A-Z]/.test(password)) return toast.error("Password must contain a capital letter.");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return toast.error("Password must contain a special character.");
    }

    try {
      if (isLogin) {
        await loginUser(email, password);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      } else {
        await registerUser(name, email, password);
        toast.success("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        // The signed-in user info.
        const userFromGoogle = result.user;
        setUser(userFromGoogle);
        backendGoogleLogin(userFromGoogle)
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You have logged in successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred during Google login.");
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Something went wrong",
          text: error.message,
          icon: "error",
        });
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription>{isLogin ? "Sign in to access your dashboard" : "Join to find scholarships"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input id="name" name="name" placeholder="John Doe" required className="pl-10" /></div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /><Input id="email" name="email" type="email" placeholder="john@example.com" required className="pl-10" /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" required className="pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {/* CORRECTED LINE: Use valid JSX for conditional rendering */}
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
            </Button>
          </form>
          <div className="relative my-4"><div className="absolute inset-0 flex items-center"><Separator /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-500">Or continue with</span></div></div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleGoogleSignIn}><Chrome className="mr-2 h-4 w-4" />Google</Button>
            <Button variant="outline" disabled><Github className="mr-2 h-4 w-4" />GitHub</Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline font-medium ml-1">
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Auth;