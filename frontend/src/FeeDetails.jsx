// FeeDetails.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FeeDetails.css'; // You’ll create this CSS file for custom styles

function FeeDetails({ studentId }) {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/fees/${studentId}`);
        if (!response.ok) {
          throw new Error('Unable to fetch fee details');
        }
        const data = await response.json();
        setFees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, [studentId]);

  if (loading) return <h4 className="p-4 text-primary">Loading fee details...</h4>;
  if (error) return <h4 className="p-4 text-danger">Error: {error}</h4>;
  if (!fees) return <h4 className="p-4">No fee details found</h4>;

  const remaining = fees.totalFee - fees.paid;

  return (
    <div className="container py-5">
      <motion.div
        className="card glass-card shadow-lg border-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="card-header bg-dark text-white text-center rounded-top">
          <motion.h3
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
            className="mb-0"
          >
            🎓 Fee Summary
          </motion.h3>
        </div>
        <div className="card-body bg-light">
          <div className="row g-4">
            <FeeItem label="Mess Fee" value={fees.messFee} />
            <FeeItem label="Special Food" value={fees.specialFoodFee} />
            <FeeItem label="Fine" value={fees.fine} />
            <FeeItem label="Hostel Fee" value={fees.roomFee} />
            <FeeItem label="Total Fee" value={fees.totalFee} />
            <FeeItem label="Paid Amount" value={fees.paid} />
            <FeeItem label="Remaining Amount" value={remaining} highlight />
            <FeeItem label="Due Date" value={fees.dueDate} due />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeeItem({ label, value, highlight, due }) {
  const classes = highlight
    ? 'bg-warning text-dark fw-bold'
    : due
    ? 'bg-danger text-white fw-bold'
    : 'bg-white border shadow-sm';

  return (
    <motion.div
      className="col-md-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className={`p-3 rounded ${classes}`}>
        <div className="d-flex justify-content-between align-items-center">
          <span>{label}</span>
          <span>{label === 'Due Date' ? formatDate(value) : `₹ ${value}`}</span>
        </div>
      </div>
    </motion.div>
  );
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default FeeDetails;
