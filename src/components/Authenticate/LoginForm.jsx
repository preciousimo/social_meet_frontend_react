import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const LoginForm = event.currentTarget;
    if (LoginForm.checkValidity() === false) {
      event.stopPropagation();
    }

    const data = {
      email: form.email,
      password: form.password,
    };
    setLoading(true);

    axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
          })
        );
        toast.success("Login successful");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.message) {
          toast.error("No active user with this details found");
        }
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Your password"
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
            Login
          </button>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
