import React, { useState } from 'react';

const SetPasswordForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch("http://localhost:8080/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, password }),
      });

      if (response.ok) {
        setMessage("🎉 Password set successfully!");
      } else {
        setMessage("❌ Failed to set password.");
      }
    } catch (error) {
      setMessage("❌ Error occurred while setting password.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(120deg, #f6d365, #fda085);
            transition: all 0.5s ease;
          }

          .form-container {
            max-width: 400px;
            margin: 100px auto;
            padding: 30px;
            background: #ffffffcc;
            border-radius: 20px;
            box-shadow: 0 12px 24px rgba(0,0,0,0.1);
            animation: fadeIn 1s ease-out;
            backdrop-filter: blur(5px);
          }

          @keyframes fadeIn {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .form-container h2 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 6px;
            font-weight: bold;
            color: #333;
          }

          input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-sizing: border-box;
            transition: all 0.3s ease;
          }

          input:hover,
          input:focus {
            border-color: #ff9f59;
            box-shadow: 0 0 10px #ffd6b3;
            transform: scale(1.02);
            outline: none;
          }

          .btn {
            display: block;
            width: 100%;
            padding: 12px;
            background-color: #ff7e5f;
            color: white;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .btn:hover {
            background-color: #feb47b;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
            transform: scale(1.03);
          }

          .message {
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
            color: #2d3748;
          }
        `}
      </style>

      <div className="form-container">
        <h2>🔐 Set Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Setting..." : "Set Password"}
          </button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </>
  );
};

export default SetPasswordForm;
