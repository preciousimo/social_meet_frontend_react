import { Link } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";

function Login() {

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4">
      <div className="main-left">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl">Log in</h1>

          <p className="mb-6 text-gray-500">
            Lorem ipsum dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum
            dolor sit mate. Lorem ipsum dolor sit mate. Lorem ipsum dolor sit
            mate. Lorem ipsum dolor sit mate.
          </p>

          <p className="font-bold">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Click here
            </Link>{" "}
            to create one!
          </p>
          
        </div>
      </div>

      <div className="main-right">
        <div className="p-12 bg-white border border-gray-200 rounded-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
