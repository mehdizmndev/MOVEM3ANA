import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/api";
import Icon from "../components/Icon";

const GOOGLE_AUTH_URL = "http://import.meta.env.VITE_API_URL/auth/google";
const APPLE_AUTH_URL = "http://import.meta.env.VITE_API_URL/auth/apple";

export default function AuthPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState(
    params.get("tab") === "signup" ? "signup" : "login",
  );
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleAppleLogin = () => {
    window.location.href = APPLE_AUTH_URL;
  };

  const handleRedirection = (userData) => {
    if (userData.role === "admin") {
      navigate("/admin");
    } else if (userData.role === "club") {
      if (userData.club) {
        navigate("/club-portal");
      } else {
        navigate("/club-create");
      }
    } else {
      navigate("/");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const res = await login(email, password);
      const userData = res.data?.user || res.user || res;
      handleRedirection(userData);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value,
      role: role,
    };
    try {
      const res = await register(data);
      const userData = res.data?.user || res.user || res;
      handleRedirection(userData);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 pb-16 px-4 relative flex items-center justify-center overflow-hidden min-h-screen bg-surface dark:bg-stone-950">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-primary-container opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-secondary-container opacity-10 blur-[120px] rounded-full" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC207LuePeQn6uXnQz4ivw66PoXmUgRoXWLeR25nN22B-COIz3-ht6tvfPZ883dY890ea03JAikeq7qE2-V7rJhVJtWnakPCEgpiTPRfkbmCoBPjZSiGHkcbL2Fen19h0D0urrPkejX0Na1EO0ussDjxkVd9Ify5RLldZPMAJDRkMVlays8UJ93bgRER7x4SEssyrknmKDwCHU7psjROBIEllQA_Bhl3bwl3wpaoyX6FYJvzPrGSfYcek2vn1k_o407a8hy_MYMVF8"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 grayscale scale-110 blur-sm"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-surface-container-lowest dark:bg-stone-900 rounded-xl shadow-2xl shadow-on-surface/5 border-t-8 border-primary-container overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-surface-container-low dark:bg-stone-800">
            {[
              ["Login", "login"],
              ["Sign Up", "signup"],
            ].map(([label, val]) => (
              <button
                key={val}
                onClick={() => setTab(val)}
                className={`flex-1 py-5 text-center font-headline uppercase tracking-tighter text-xl transition-colors ${
                  tab === val
                    ? "bg-surface-container-lowest dark:bg-stone-900 text-primary-container font-black"
                    : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 font-bold"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-8 md:p-10">
            {/* ── LOGIN ── */}
            {tab === "login" && (
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="text-center mb-8">
                  <h1 className="font-body font-black text-3xl tracking-tight text-on-surface dark:text-stone-100 uppercase mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-stone-500 text-sm font-body">
                    Fuel your performance. Sign in to your portal.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">
                      Email Address
                    </label>
                    <input
                      name="email"
                      className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 placeholder:text-stone-400 font-body"
                      placeholder="athlete@movem3ana.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 font-body">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-primary-container hover:underline font-body"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      name="password"
                      className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 font-body"
                      placeholder="••••••••"
                      type="password"
                      required
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-primary-container hover:bg-primary text-white font-headline uppercase tracking-wider text-xl font-black py-4 rounded-xl transition-all active:scale-[0.98] transform shadow-lg shadow-primary-container/20 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Enter Arena"}
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-200 dark:border-stone-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                    <span className="bg-surface-container-lowest dark:bg-stone-900 px-4 text-stone-400 font-body">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center gap-3 py-3 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors active:scale-95 transform"
                  >
                    <span className="font-black text-lg text-primary-container">
                      G
                    </span>
                    <span className="text-sm font-bold font-body text-on-surface dark:text-stone-100">
                      Google
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAppleLogin}
                    className="flex items-center justify-center gap-3 py-3 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors active:scale-95 transform"
                  >
                    <Icon
                      name="phone_iphone"
                      size={20}
                      className="text-on-surface dark:text-stone-100"
                    />
                    <span className="text-sm font-bold font-body text-on-surface dark:text-stone-100">
                      Apple
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* ── SIGN UP ── */}
            {tab === "signup" && (
              <form className="space-y-5" onSubmit={handleSignup}>
                <div className="text-center mb-8">
                  <h1 className="font-body font-black text-3xl tracking-tight text-on-surface dark:text-stone-100 uppercase mb-2">
                    Join The Squad
                  </h1>
                  <p className="text-stone-500 text-sm font-body">
                    Start your kinetic journey today.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                {/* Role toggle */}
                <div className="flex bg-surface-container-high dark:bg-stone-800 p-1 rounded-full mb-6">
                  <button
                    type="button"
                    onClick={() => setRole("user")}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all font-body ${role === "user" ? "bg-white dark:bg-stone-700 shadow-sm text-primary-container" : "text-stone-500"}`}
                  >
                    I'm a User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("club")}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all font-body ${role === "club" ? "bg-white dark:bg-stone-700 shadow-sm text-primary-container" : "text-stone-500"}`}
                  >
                    I'm a Club Owner
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["First Name", "Last Name"].map((label, i) => (
                    <div key={label} className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">
                        {label}
                      </label>
                      <input
                        name={i === 0 ? "first_name" : "last_name"}
                        className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 placeholder:text-stone-400 font-body"
                        placeholder={i === 0 ? "John" : "Doe"}
                        type="text"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">
                    Email Address
                  </label>
                  <input
                    name="email"
                    className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 placeholder:text-stone-400 font-body"
                    placeholder="athlete@movem3ana.com"
                    type="email"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Password", "password"],
                    ["Confirm", "password_confirmation"],
                  ].map(([label, name]) => (
                    <div key={label} className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 px-1 font-body">
                        {label}
                      </label>
                      <input
                        name={name}
                        className="w-full bg-surface-container-high dark:bg-stone-800 border-0 border-b-2 border-outline-variant/30 focus:border-primary-container focus:ring-0 px-4 py-3 rounded-t-lg transition-all text-on-surface dark:text-stone-100 font-body"
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-3 px-1">
                  <input
                    name="terms"
                    className="mt-1 rounded border-stone-300 text-primary-container focus:ring-primary-container"
                    type="checkbox"
                    required
                  />
                  <label className="text-xs text-stone-500 leading-tight font-body">
                    By creating an account, I agree to the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      className="text-primary-container font-semibold hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      className="text-primary-container font-semibold hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-primary-container hover:bg-primary text-white font-headline uppercase tracking-wider text-xl font-black py-4 rounded-xl transition-all active:scale-[0.98] transform shadow-lg shadow-primary-container/20 disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
