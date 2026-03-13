import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, KeyRound, Loader } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

function ForgotPassword({ onBack, onPasswordReset }) {
  const [step, setStep] = useState("email"); // email, otp, reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // Handle step-1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (!email) {
        setError("Please enter your email address");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess("OTP has been sent to your email address");
      setOtpSent(true);
      setTimer(60); // 60 seconds timer
      setIsLoading(false);

      // Start countdown timer
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
      console.error("Forgot password error:", err);
      setIsLoading(false);
    }
  };

  // Handle step-2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (!otp) {
        setError("Please enter the OTP");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid OTP. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess("OTP verified successfully");
      setStep("reset");
      setIsLoading(false);
    } catch (err) {
      setError("Failed to verify OTP. Please try again.");
      console.error("OTP verification error:", err);
      setIsLoading(false);
    }
  };

  // Handle step-3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validation
      if (!newPassword || !confirmPassword) {
        setError("Please enter both password fields");
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess("Password reset successfully!");
      setIsLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        onPasswordReset();
      }, 2000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-blue-950 hover:text-blue-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      {/* Forgot Password Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-950 rounded-lg mb-4">
            <KeyRound size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-blue-950 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-sm">
            {step === "email"
              ? "Enter your email to receive an OTP"
              : step === "otp"
                ? "Enter the OTP sent to your email"
                : "Create your new password"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Step 1: Email */}
        {step === "email" && (
          <form onSubmit={handleRequestOTP} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  disabled={isLoading || otpSent}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || otpSent}
              className="w-full bg-blue-950 hover:bg-blue-900 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 text-center text-2xl tracking-widest"
                disabled={isLoading}
              />
              <p className="text-gray-500 text-xs mt-2">
                Resend OTP in {timer}s{" "}
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setStep("email");
                    }}
                    className="text-blue-950 font-semibold hover:underline"
                  >
                    or go back
                  </button>
                )}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 hover:bg-blue-900 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                  disabled={isLoading}
                />
              </div>
              {newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 hover:bg-blue-900 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={18} className="animate-spin" />}
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Step Progress */}
        <div className="mt-8 flex justify-center gap-2">
          <div
            className={`h-2 w-8 rounded-full transition-colors ${
              step === "email" ? "bg-blue-950" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-2 w-8 rounded-full transition-colors ${
              step === "otp" ? "bg-blue-950" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-2 w-8 rounded-full transition-colors ${
              step === "reset" ? "bg-blue-950" : "bg-gray-300"
            }`}
          ></div>
        </div>

        {/* Toggle to OTP step when email is sent */}
        {otpSent && step === "email" && (
          <button
            type="button"
            onClick={() => setStep("otp")}
            className="w-full mt-4 text-blue-950 font-semibold text-sm hover:underline"
          >
            Proceed to OTP Verification →
          </button>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
