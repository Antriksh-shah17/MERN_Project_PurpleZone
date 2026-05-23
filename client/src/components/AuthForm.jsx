export default function AuthForm({
  mode,
  formData,
  loading,
  error,
  onChange,
  onSubmit,
  onToggleMode
}) {
  const isRegister = mode === "register";

  return (
    <div className="auth-card">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${isRegister ? "auth-tab-active" : ""}`}
          type="button"
          onClick={() => !isRegister && onToggleMode()}
        >
          Register
        </button>
        <span className="auth-tab-divider">|</span>
        <button
          className={`auth-tab ${!isRegister ? "auth-tab-active" : ""}`}
          type="button"
          onClick={() => isRegister && onToggleMode()}
        >
          Login
        </button>
      </div>

      <form className="auth-form exact-auth-form" onSubmit={onSubmit}>
        {isRegister && (
          <label className="line-field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </label>
        )}

        <label className="line-field">
          <input
            type="email"
            name="email"
            placeholder={isRegister ? "Email" : "Username"}
            value={formData.email}
            onChange={onChange}
            required
          />
        </label>

        <label className="line-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
            minLength="6"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button className="exact-button" type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
