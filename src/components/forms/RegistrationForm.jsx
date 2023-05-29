import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;
    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }
    const data = {
      name: form.name,
      email: form.email,
      password1: form.password1,
      password2: form.password2,
    };
    axios
      .post("http://127.0.0.1:8000/api/signup/", data)
      .then((res) => {
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
        if (err.message) {
          setError(err.request.response);
        }
      });
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
          Sign up
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm;
