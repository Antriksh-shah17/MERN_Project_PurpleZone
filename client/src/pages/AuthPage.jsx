import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import Logo from "../components/Logo";
import sunsetImage from "../assets/images/sunset-5536777_1920.png";
import { setAuthSession } from "../utils/authSession";
import { refreshQuestions } from "../utils/testSession";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const initialForm = {
  name: "",
  email: "",
  password: ""
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleToggleMode = () => {
    setError("");
    setFormData(initialForm);
    setMode((current) => (current === "register" ? "login" : "register"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "register" ? "/auth/register" : "/auth/login";
      const payload =
        mode === "register"
          ? formData
          : { email: formData.email, password: formData.password };

      const { data } = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      setAuthSession({ user: data.user, token: data.token });
      await refreshQuestions();
      navigate("/test");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="exact-page auth-page">
      <header className="top-strip">
        <div className="top-strip-inner">
          <Logo />
        </div>
      </header>

      <section className="auth-stage">
        <div
          className="auth-sunset"
          style={{ backgroundImage: `linear-gradient(rgba(51, 23, 41, 0.14), rgba(18, 13, 21, 0.58)), url(${sunsetImage})` }}
        />
        <div className="auth-slate" />

        <div className="auth-floating-card">
          <AuthForm
            mode={mode}
            formData={formData}
            loading={loading}
            error={error}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onToggleMode={handleToggleMode}
          />
        </div>
      </section>
    </main>
  );
}
