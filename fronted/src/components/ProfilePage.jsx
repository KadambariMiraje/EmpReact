import React, { useState, useEffect } from "react";

function ProfilePage({ user = {} }) {  // ✅ Accept user as prop, not from useLocation
  console.log("ProfilePage user:", user); 
  const [formData, setFormData] = useState(user);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const id = user.emp_id ; // ✅ handle both cases
    console.log("Updating employee with ID:", id); // ← add this to debug
    
    try {
        const res = await fetch(`http://localhost:3000/employee/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (res.ok) setMsg("Profile updated successfully!");
        else setMsg(result.message || "Update failed");
    } catch (err) {
        setMsg("Server error. Please try again.");
    }
};

  return (
    <div className="container mt-4">
      <h3>My Profile</h3>
      {msg && <div className="alert alert-success">{msg}</div>}
      <div className="card shadow-sm p-3" style={{ maxWidth: "500px" }}>
        {formData.photo ? (
          <img
            src={`data:image/jpeg;base64,${formData.photo}`}
            alt={formData.first_name}
            className="card-img-top mb-3"
            style={{ height: "180px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-secondary text-white d-flex align-items-center justify-content-center mb-3"
            style={{ height: "180px" }}
          >
            No Photo
          </div>
        )}
        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "Mobile", name: "mobile_no", type: "text" },
          { label: "Email", name: "email", type: "email" },
        ].map(({ label, name, type }) => (
          <div className="mb-2" key={name}>
            <label>{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary w-100 mt-2" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;