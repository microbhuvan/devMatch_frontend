import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/changepassword",
        {
          newPassword: password,
          newPassword2: password2,
        },
        { withCredentials: true }
      );

      //console.log("Res.data", res.data);
      //console.log("Res.data.data", res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => navigate("/"), 4000);
    } catch (err) {
      setError("something went wrong" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-base-300 p-5 rounded-lg max-w-md">
      <h1 className="text-3xl font-bold">ChangePassword</h1>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">New Password:</span>
        </div>
        <div className="relative">
          <input
            type={showPassword1 ? "text" : "password"}
            value={password}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            onClick={() => setShowPassword1((prev) => !prev)}
          >
            {showPassword1 ? "Hide" : "Show"}
          </button>
        </div>
      </label>
      <label className="form-control w-full max-w-xs my-2">
        <div className="label">
          <span className="label-text">Confirm New Password:</span>
        </div>
        <div className="relative">
          <input
            type={showPassword2 ? "text" : "password"}
            value={password2}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setpassword2(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            onClick={() => setShowPassword2((prev) => !prev)}
          >
            {showPassword2 ? "Hide" : "Show"}
          </button>
        </div>
      </label>
      <p className="opacity-50 text-pink-500 text-center">
        Password must have minimum length of 8, with 1 Uppercase,1 number and 1
        special character each
      </p>
      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary m-2 w-full ${
          loading ? "bg-gray-400" : "btn btn-primary"
        }`}
        onClick={submitPassword}
      >
        {loading ? "Changing" : "Submit"}
      </button>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Changes Saved Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
