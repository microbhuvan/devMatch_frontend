import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
//some changes

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  //const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user.photoURL || null);
  const [age, setAge] = useState(user.age || 0);
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    console.log("save profile called");
    setError("");
    if (!gender) {
      setError("please select gender");
      return;
    }

    // const res = await axios.patch(
    //   BASE_URL + "/profile/edit",
    //   {
    //     firstName,
    //     lastName,
    //     gender,
    //     age,
    //     about,
    //     photoURL,
    //     skills: skills.split(",").map((skill) => skill.trim()),
    //   },
    //   { withCredentials: true }
    // );
    //console.log("axios patch working");

    try {
      const data = new FormData();
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("gender", gender);
      data.append("age", age);
      data.append("about", about);
      data.append("skills", skills); // send as comma string, backend will split

      if (photo) {
        data.append("photo", photo);
      }

      const res = await axios.patch(BASE_URL + "/profile/edit", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || err.message || "unknown error");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center md:flex-row justify-center my-10 ">
        <p className="block md:hidden text-center text-red-400">
          to see the preview
        </p>
        <div className="flex justify-center mx-5 my-5">
          <div className="card bg-base-300 max-w-xs shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-xl font-bold">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Upload Photo</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPhoto(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {/* <input
                    type="select"
                    value="choose an option"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setGender(e.target.value)}
                  /> */}
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">skills:</span>
                  </div>
                  <input
                    type="text"
                    value={skills}
                    className="input input-bordered w-full max-w-xs"
                    placeholder="use comma to add multiple skills"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{
            firstName,
            lastName,
            photoURL: preview,
            age,
            gender,
            about,
            skills: skills.split(",").map((skill) => skill.trim()),
          }}
          showActions={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Changes saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
