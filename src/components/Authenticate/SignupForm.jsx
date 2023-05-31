import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const SignupForm = event.currentTarget;
    if (SignupForm.checkValidity() === false) {
      event.stopPropagation();
      toast.error("Something went wrong");
    } else {
      if (form.password1 !== form.password2) {
        toast.error("Passwords do not match");
        return;
      }

      const data = {
        name: form.name,
        email: form.email,
        password1: form.password1,
        password2: form.password2,
      };
      setLoading(true);

      axios
        .post("http://127.0.0.1:8000/api/signup/", data)
        .then((res) => {
          const { message, access, refresh, user } = res.data;
          if (message === "success") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                access,
                refresh,
                user,
              })
            );
            toast.success("Registration successful");
            navigate("/");
          } else {
            toast.success("Check your email for the activation link");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.email
          ) {
            toast.error("Email is already registered");
          } else if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            toast.error(error.response.data.error);
          } else {
            toast.error("An error occurred during registration.");
          }
        })
        .finally(() => {
          setLoading(false); // Set loading state back to false
        });
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="email">E-mail</label>
        <br />
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Your e-mail address"
          className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="password1">Password</label>
        <br />
        <input
          type="password"
          id="password1"
          value={form.password1}
          onChange={(e) => setForm({ ...form, password1: e.target.value })}
          placeholder="Your password"
          className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="password2">Repeat password</label>
        <br />
        <input
          type="password"
          id="password2"
          value={form.password2}
          onChange={(e) => setForm({ ...form, password2: e.target.value })}
          placeholder="Repeat your password"
          className="w-full mt-2 py-4 px-6 border border-gray-200 rounded-lg"
        />
      </div>

      <div>
        {loading ? (
          <button
            className="py-4 px-6 bg-purple-600 text-white rounded-lg"
            type="button"
            disabled
          >
            Loading...
          </button>
        ) : (
          // Render regular sign up button if loading state is false
          <button
            className="py-4 px-6 bg-purple-600 text-white rounded-lg"
            type="submit"
          >
            Sign up
          </button>
        )}
      </div>
    </form>
  );
}

export default SignupForm;
