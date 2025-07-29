import { Link } from "react-router";
import { CheckCircle, Home, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-gray-600">
              <p className="text-lg mb-2">
                Your scholarship application has been submitted successfully.
              </p>
              <p>
                We have received your payment of <strong>$150</strong> and your
                application is now being processed.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#009b5d]/70 mb-2">
                What's Next?
              </h3>
              <ul className="text-sm text-[#009b5d] space-y-1 text-left">
                <li>
                  • Your application will be reviewed within 5-7 business days
                </li>
                <li>
                  • You'll receive email updates about your application status
                </li>
                <li>• Check your dashboard for application progress</li>
                <li>• Our team may contact you for additional information</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#009b5d] hover:bg-[#009b5d]/70">
                <Link to="/user/dashboard">
                  <FileText className="mr-2 h-4 w-4" />
                  View Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Application ID: SCH-2024-
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p>Please save this ID for your records</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
