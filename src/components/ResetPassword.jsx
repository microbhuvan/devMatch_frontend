import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function ResetPassword() {
  const [otp, setOTP] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const emailId = location.state?.emailId;

  if (!emailId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">
          Email not provided. Please request OTP again.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/forgot-password")}
        >
          Go Back
        </button>
      </div>
    );
  }
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        BASE_URL + "/reset-password",
        { emailId, newPassword },
        { withCredentials: true }
      );

      setSuccess(res.data.message || "Password Reset Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data || "Error Resetting Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-base-300 rounded-lg max-w-md mx-auto p-4">
      <h1 className="text-center text-3xl font-bold m-2">Reset Password</h1>
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col justify-center items-center"
      >
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-2 text-center">{success}</p>
        )}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="max-w-lg p-3 m-3 rounded-md border"
          />
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Resetting.." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
