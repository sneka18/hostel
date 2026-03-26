import React, { useState } from "react";

function Studentreg() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sem: "",
    email: "",
    block: "",
    roomno: "",
    dept: "",
    phone: "",
  });

  const [studentId, setStudentId] = useState(null); // will hold backend-generated ID
  const [successMessage, setSuccessMessage] = useState(""); // success message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/studenttemp/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setStudentId(data.id);
        setSuccessMessage("Student registered successfully!"); // Set success message
      } else {
        console.error("Failed to register student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-5 bg-white" id="register">
      <h2 className="mb-4">Register for Hostel</h2>
      <br />
      <br />
      <form onSubmit={handleSubmit} className="row g-3">
        {["name", "age", "sem", "email", "block", "roomno", "dept", "phone"].map((field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={field === "email" ? "email" : "text"}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-dark">Submit</button>
        </div>
      </form>

      {/* Success message display */}
      {successMessage && (
        <div className="alert alert-success mt-3">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default Studentreg;