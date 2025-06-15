import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);

  const dispatch = useDispatch();

  const submitPassword = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/changepassword",
        {
          newPassword: password,
          newPassword2: password2,
        },
        { withCredentials: true }
      );

      console.log("Res.data", res.data);
      console.log("Res.data.data", res.data.data);
      dispatch(addUser(res.data.data));
    } catch (err) {
      res.status(400).send("something went wrong" + err.message);
    }
  };

  return (
    <div>
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
      <label>
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={submitPassword}
      >
        Submit
      </button>
    </div>
  );
};

export default ChangePassword;
