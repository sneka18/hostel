import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button } from "react-bootstrap";

const Card = ({ leave, status, onView }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className={`leave-card ${status}`}
    onClick={() => onView(leave)}
  >
    <div className="leave-content">
      <h5>Leave ID: #{leave.leaveId}</h5>
      <p><strong>Reason:</strong> {leave.reason}</p>
    </div>
    <span className={`status-badge ${status}`}>
      {status.toUpperCase()}
    </span>
    <div className="view-overlay">
      <span>View Details</span>
    </div>
  </motion.div>
);

const LeaveDashboard = ({ studentId }) => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [form, setForm] = useState({ fromDate: "", toDate: "", reason: "" });
  const [modalLeave, setModalLeave] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/leave/${studentId}/pending`)
      .then((res) => res.json())
      .then(setPendingLeaves);

    fetch(`http://localhost:8080/api/leave/${studentId}`)
      .then((res) => res.json())
      .then(setApprovedLeaves);
  }, [studentId]);

  const handleApplyLeave = () => {
    const { fromDate, toDate, reason } = form;
    if (!fromDate || !toDate || !reason.trim()) {
      return alert("Please fill in all fields");
    }

    fetch(`http://localhost:8080/api/leave/${studentId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromDate, toDate, reason }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Leave applied successfully!");
        setForm({ fromDate: "", toDate: "", reason: "" });
      });
  };

  return (
    <div className="leave-container">
      <style>{`
        .leave-container {
          background: linear-gradient(to right, #eef2f3, #8e9eab);
          padding: 40px 20px;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .leave-section {
          background: white;
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .leave-card {
          position: relative;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          cursor: pointer;
        }

        .leave-card.pending {
          background: linear-gradient(135deg, #ffecb3, #ffcc80);
          border-left: 8px solid #ffa000;
        }

        .leave-card.approved {
          background: linear-gradient(135deg, #c8e6c9, #a5d6a7);
          border-left: 8px solid #43a047;
        }

        .leave-content {
          padding-right: 90px;
        }

        .status-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
          text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
        }

        .status-badge.pending {
          background-color: #ffa000;
          color: white;
        }

        .status-badge.approved {
          background-color: #43a047;
          color: white;
        }

        .view-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: rgba(0, 0, 0, 0.1);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          color: #000;
          transition: opacity 0.3s ease-in-out;
        }

        .leave-card:hover .view-overlay {
          opacity: 1;
        }

        .leave-header {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2c3e50;
          text-shadow: 1px 1px #ccc;
        }
      `}</style>

      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-5 leave-header"
      >
        📝 Student Leave Dashboard
      </motion.h1>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="leave-section">
            <h4 className="text-warning mb-3">🕗 Pending Leaves</h4>
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map((leave, idx) => (
                <Card
                  key={idx}
                  leave={leave}
                  status="pending"
                  onView={setModalLeave}
                />
              ))
            ) : (
              <p className="text-muted">No pending leaves.</p>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="leave-section">
            <h4 className="text-success mb-3">✅ Approved Leaves</h4>
            {approvedLeaves.length > 0 ? (
              approvedLeaves.map((leave, idx) => (
                <Card
                  key={idx}
                  leave={leave}
                  status="approved"
                  onView={setModalLeave}
                />
              ))
            ) : (
              <p className="text-muted">No approved leaves.</p>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="leave-section mt-5"
      >
        <h4 className="text-primary mb-4">✍️ Apply for New Leave</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              placeholder="From Date"
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              placeholder="To Date"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              placeholder="Reason for Leave"
            />
          </div>
          <div className="col-12">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleApplyLeave}
            >
              🚀 Submit Leave Request
            </Button>
          </div>
        </div>
      </motion.div>

      <Modal show={modalLeave !== null} onHide={() => setModalLeave(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📄 Leave Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalLeave && (
            <>
              <p><strong>Leave ID:</strong> {modalLeave.leaveId}</p>
              <p><strong>From:</strong> {modalLeave.fromDate}</p>
              <p><strong>To:</strong> {modalLeave.toDate}</p>
              <p><strong>Reason:</strong> {modalLeave.reason}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalLeave(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeaveDashboard;
