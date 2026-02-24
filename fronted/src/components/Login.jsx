import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Login() {
  const [userInput, setUserInput] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");

  try {
    const response = await fetch("http://localhost:3000/employee/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    });

    const result = await response.json();

   

    if (!response.ok) {
      setMsg(result.message);
      return;
    }

    setUser({
  first_name: result.data.first_name,
  last_name: result.data.last_name,
  empId: result.data.emp_id
});

 if (result.data.emp_id === "admin") {
  navigate("/admin");
} else {
  // Pass user data via state
  navigate("/emp", { state: { user: result.data } });
}
  

  } catch (error) {
    setMsg("Server error. Please try again.");
  }
};


  return (
    <>
      <fieldset className="w-25 m-auto mt-5 p-5 bg-light rounded">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              type="text"
              className="form-control mb-3"
              value={userInput.empId || ""}
              name="empId"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control mb-3"
              value={userInput.password || ""}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </fieldset>

      <div className="text-center">{msg}</div>
    </>
  );
}

export default Login;