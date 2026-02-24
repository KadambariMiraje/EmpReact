import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emp_id: "",
    first_name: "",
    last_name: "",
    city: "",
    mobile_no: "",
    email: "",
    type: "",
    password: ""
  });

  const [photo, setPhoto] = useState(null);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    data.append("photo", photo);

    try {
      const response = await fetch("http://localhost:3000/employee/", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        setMsg("Signup successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMsg(result.message);
      }

    } catch (error) {
      setMsg("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="emp_id" placeholder="Employee ID" onChange={handleChange} />
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="mobile_no" placeholder="Mobile" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="type" placeholder="Type" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button>Signup</button>
      <div>{msg}</div>
    </form>
  );
}

export default Signup;