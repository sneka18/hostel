import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Studentreg from './studentreg';
import HostelPrice from "./HostelPrice";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import Features from './Features.jsx'

function Home() {
  const [loginType, setLoginType] = useState("student"); // 'student' or 'admin'
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  const handlelogin = async (event) => {
    event.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("id", id);
      formData.append("password", password);

      const response = await fetch('http://localhost:8080/students/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });
      const data = await response.text();
      if (data.includes("Login Successful")) {
        localStorage.setItem("loggedUser", JSON.stringify({ id, loginType }));
        localStorage.setItem("studentId", id);
        window.location.href = `/student/${id}`;
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleadminlogin = async (event) => {
    event.preventDefault();
    try {
      const formData = new URLSearchParams();
      const loginData = {
        userid: id,
        password: password
      };
      const response = await fetch('http://localhost:8080/admin/login', {
        method: "POST",
        headers: {
          "Content-Type":  'application/json',
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        const data = await response.text();  // Assuming backend returns a simple message like "Login Successful"
        localStorage.setItem("loggedUser", JSON.stringify({ id, loginType: 'admin' }));
        navigate(`/admin/profile`);  // Redirect to admin dashboard
      } else {
        const errorData = await response.text();
        setLoginError(errorData);  // Display error message from backend
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const handleSubmit = (event) => {
    if (loginType === 'student') {
      handlelogin(event);
    } else {
      handleadminlogin(event);
    }
  };

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <Navbar />
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Welcome to SmartStay – Your Digital Hostel Companion
          </h1>
          <p className="col-lg-10 fs-4">
            Manage your hostel life with ease. From seamless room allocations to real-time updates and secure logins, everything you need is just a click away.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
              >
                <option value="student">Student Login</option>
                <option value="admin">Admin Login</option>
              </select>
              <label>Login As</label>
            </div>
            <br />
            <div className="form-floating mb-3">
            <input
              type={loginType === "student" ? "number" : "text"}
              className="form-control"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
              <label htmlFor="floatingInput">ID</label>
            </div>
            <br />
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <br />
            <button className="w-100 btn btn-lg btn-dark" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="content">
        <Features />
        <HostelPrice />
        <Studentreg />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
