import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        BASE_URL + "/verify-reset-otp",
        { emailId, otp },
        { withCredentials: true }
      );

      setSuccess(res.data.message || "OTP verified successfully");
      setTimeout(() => {
        navigate("/reset-password", { state: { emailId } });
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-md mx-auto p-4 bg-base-300 rounded-lg">
      <h1 className="text-center text-3xl font-bold m-2">Enter OTP</h1>
      <form
        className="flex flex-col justify-center align-items"
        onSubmit={handleVerifyOTP}
      >
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        {success && (
          <p className="text-green-500 mb-2 text-center">{success}</p>
        )}
        <input
          type="text"
          value={otp}
          placeholder="Enter your OTP here"
          onChange={(e) => setOtp(e.target.value)}
          className="max-w-md p-2 m-3 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOTP;
