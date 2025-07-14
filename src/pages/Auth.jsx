import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({}); 
    const navigate=useNavigate();

    const validatePassword = (password) => { 
        const errors = [];
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one capital letter");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character");
        }
        return errors;
    };

    const handleSubmit = (e) => { // Removed : React.FormEvent
        e.preventDefault();
        const newErrors = {}; // Removed Record<string, string>

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else {
            const passwordErrors = validatePassword(formData.password);
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors.join(". ");
            }
        }

        // Name validation for registration
        if (!isLogin && !formData.name) {
            newErrors.name = "Name is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Mock authentication - replace with actual auth logic
            if (!isLogin) {
                axios.post('http://localhost:4000/api/auth/register', formData)
                    .then(res => {
                        console.log(res.data);

                    }).catch(err => {
                        console.log(err);
                    })



            }else{
                axios.post('http://localhost:4000/api/auth/login', formData)
                    .then(res => {
                        if (res.data.user.email) {
                            localStorage.setItem('token',res.data.token);
                            localStorage.setItem('user',JSON.stringify(res.data.user))
                            navigate('/')
                        }
                        console.log(res.data);

                    }).catch(err => {
                        console.log(err);
                    })
            }
            toast.success(isLogin ? "Login successful!" : "Registration successful!");
            console.log("Form submitted:", formData);
        }
    };

    const handleSocialAuth = (provider) => { // Removed : string
        // Mock social authentication
        toast.success(`${provider} authentication initiated`);
        console.log(`${provider} auth clicked`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="shadow-xl border-0">
                    <CardHeader className="text-center space-y-2">
                        <div className="mx-auto bg-blue-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center">
                            <span className="font-bold text-xl">SG</span>
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </CardTitle>
                        <CardDescription>
                            {isLogin
                                ? "Sign in to access your scholarship dashboard"
                                : "Join thousands of students finding their perfect scholarships"
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                {!isLogin && (
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <p>Password must contain:</p>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>At least 6 characters</li>
                                            <li>At least one capital letter</li>
                                            <li>At least one special character</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                {isLogin ? "Sign In" : "Create Account"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                onClick={() => handleSocialAuth("Google")}
                                className="w-full"
                            >
                                <Chrome className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleSocialAuth("GitHub")}
                                className="w-full"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="text-center">
                        <p className="text-sm text-gray-600">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{""}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </CardFooter>
                </Card>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Auth;