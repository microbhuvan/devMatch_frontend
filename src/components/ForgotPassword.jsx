import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function ForgotPassword() {
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/request-reset-otp",
        { emailId },
        { withCredentials: true }
      );
      console.log(res.data);
      return navigate("/verify-otp", { state: { emailId } });
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-base-300 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>

      <form onSubmit={handleRequestOTP}>
        <input
          type="email"
          placeholder="Enter your email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          required
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Sending..." : "Request OTP"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
}

export default ForgotPassword;
