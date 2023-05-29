import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
    }
    const data = {
      email: form.email,
      password: form.password,
    };
    axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
          })
        );

        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.message) {
          setError(err.request.response);
        }
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

      {error.length > 0 && (
        <div className="bg-red-300 text-white rounded-lg p-6">
          {error.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <div>
        <button
          className="py-4 px-6 bg-purple-600 text-white rounded-lg"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
