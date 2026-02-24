import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import ProfilePage from "./ProfilePage";

function Admin() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [msg, setMsg] = useState("");  
  const [selectedEmp, setSelectedEmp] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/employee");
      const data = await res.json();
      if (res.ok) setEmployees(data.data);
      else setMsg(data.message || "Failed to fetch employees");
    } catch (err) {
      setMsg("Server error. Please try again.");
    }
  };

  useEffect(() => {
    if (user && user.empId === "admin") fetchEmployees();
  }, [user]);

  const handleDelete = async (empId) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      const res = await fetch(`http://localhost:3000/employee/${empId}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        setEmployees(employees.filter((e) => e.emp_id !== empId));
        setSelectedEmp(null);
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Server error. Cannot delete employee.");
    }
  };

  if (!user) return null;

  return (
    <div className="container-fluid mt-3">
      {msg && <div className="alert alert-danger">{msg}</div>}

      <div className="row">

        
        {user.empId === "admin" && (
          <div className="col-md-5">

            
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">All Employees</h5>
              <span className="badge bg-primary fs-6">Total: {employees.length}</span>
            </div>

            <div className="row g-3">
              {employees.map((emp) => (
                <div key={emp.emp_id} className="col-6">
                  <div
                    className={`card h-100 shadow-sm ${selectedEmp?.emp_id === emp.emp_id ? "border-primary border-2" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedEmp(emp)}
                  >
                  
                    {emp.photo ? (
                      <img
                        src={`data:image/jpeg;base64,${emp.photo}`}
                        alt={emp.first_name}
                        className="card-img-top"
                        style={{ height: "140px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="card-img-top bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                        style={{ height: "140px", fontSize: 28 }}
                      >
                        {`${(emp.first_name || "?")[0]}${(emp.last_name || "")[0] || ""}`.toUpperCase()}
                      </div>
                    )}

                    <div className="card-body text-center p-2">
                      <h6 className="text-primary mb-1" style={{ fontSize: 11 }}>MyCompany Inc.</h6>
                      <h6 className="card-title mb-0">{emp.first_name} {emp.last_name}</h6>
                      <small className="text-muted">#{emp.emp_id}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

       
        {user.empId === "admin" && (
          <div className="col-md-7">
            {selectedEmp ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5>Editing: {selectedEmp.first_name} {selectedEmp.last_name}</h5>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(selectedEmp.emp_id)}
                  >
                    Delete Employee
                  </button>
                </div>
                <ProfilePage user={selectedEmp} />
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                <p>Select an employee to edit</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;