import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SignupForm from "../components/Authenticate/SignupForm";
import Layout from "./Layout";

function Signup() {
  const handleRegistrationSuccess = () => {
    toast.success("Registration successful");
  };

  const handleRegistrationError = () => {
    toast.error("Registration failed");
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
        <div className="main-left">
          <div className="p-12 bg-white border border-gray-200 rounded-lg">
            <h1 className="mb-6 text-2xl">Sign up</h1>

            <p className="mb-6 text-gray-500">
              Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem
              ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum
              dolor sit mate. Lorem ipsum dolor sit mate.
            </p>

            <p className="font-bold">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Click here
              </Link>{" "}
              to log in!
            </p>
          </div>
        </div>

        <div className="main-right">
          <div className="p-12 bg-white border border-gray-200 rounded-lg">
            <SignupForm
              onRegistrationSuccess={handleRegistrationSuccess}
              onRegistrationError={handleRegistrationError}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
