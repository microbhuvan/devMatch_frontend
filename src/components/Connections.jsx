import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Connections = () => {
  //const state = useSelector((store) => store);
  //console.log(state);
  const connections = useSelector((store) => store.connections);
  console.log("connections", connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!Array.isArray(connections)) return <h1>loading...</h1>;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-white text-3xl font-bold">Connections</h1>
      {connections
        .filter((connection) => connection !== null)
        .map((connection) => {
          const { _id, firstName, lastName, photoURL, age, gender, skills } =
            connection;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 mx-auto  justify-between items-center"
            >
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoURL}
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="badge badge-outline badge-info">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link to={"/chat/" + _id}>
                <button className="btn btn-secondary flex items-center">
                  message
                </button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
