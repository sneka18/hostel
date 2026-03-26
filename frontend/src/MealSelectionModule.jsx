import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

// 🔵 Manual CSS styling
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    background: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#1e3d59',
  },
  label: {
    fontWeight: 500,
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
  },
};

function MealSelectionModule({ studentId }) {
  const [mealData, setMealData] = useState(null);
  const [specialMenuData, setSpecialMenuData] = useState([]);
  const [selectedSpecial1, setSelectedSpecial1] = useState(false);
  const [selectedSpecial2, setSelectedSpecial2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [day, setDay] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentDay = today.toLowerCase();
    setDay(currentDay);

    // Fetch menu data for the current day
    const fetchData = async () => {
      try {
        const menuRes = await fetch(`http://localhost:8080/api/menu/day/${currentDay}`);
        const menuJson = await menuRes.json();
        setMealData(menuJson);

        // Fetch special menu selections for the student
        const selectionRes = await fetch(`http://localhost:8080/api/special-menu/student/${studentId}`);
        const selectionJson = await selectionRes.json();
        setSpecialMenuData(selectionJson);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  // Handle the form submission
  const handleSubmit = () => {
    if (!mealData) return;

    const payload = {
      studentId,
      menuId: mealData.id,
      selectedSpecial1,
      selectedSpecial2,
    };

    fetch('http://localhost:8080/api/special-menu/student/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(() =>
        fetch(`http://localhost:8080/api/special-menu/student/${studentId}`)
      )
      .then(res => res.json())
      .then(data => {
        setSpecialMenuData(data);
        setSubmitted(true);
      })
      .catch(err => console.error(err));
  };

  // Handle loading state
  if (loading) return <div className="text-center mt-4">Loading meals for {day}...</div>;
  if (!mealData) return <div className="text-danger text-center">Unable to fetch meals for {day}</div>;

  const { breakfast, lunch, snacks, dinner, dailyRate, specialMenu1, specialMenu2, special1Fee, special2Fee } = mealData;

  return (
    <div style={styles.container}>
      <motion.h2 style={styles.heading} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        🍽 Today's Meals – {day.charAt(0).toUpperCase() + day.slice(1)}
      </motion.h2>

      {/* Meal Information */}
      <motion.div style={styles.card} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
        <div className="row">
          <div className="col-md-6"><strong>Breakfast:</strong> {breakfast}</div>
          <div className="col-md-6"><strong>Lunch:</strong> {lunch}</div>
          <div className="col-md-6"><strong>Snacks:</strong> {snacks}</div>
          <div className="col-md-6"><strong>Dinner:</strong> {dinner}</div>
          <div className="col-12 text-end text-muted mt-2">💰 Rate: ₹{dailyRate}</div>
        </div>
      </motion.div>

      {/* Special Menu Selection */}
      <motion.div style={styles.card} className="bg-light" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <h5 className="mb-3">✨ Special Menu Selection</h5>

        {/* Displaying selected special menu items */}
        {specialMenuData.map(item => (
          <div key={item.id}>
            {/* Show special menu 1 if selected */}
            {item.selectedSpecial1 && (
              <div className="text-success">
                ✅ {specialMenu1} - ₹{special1Fee}
              </div>
            )}

            {/* Show special menu 2 if selected */}
            {item.selectedSpecial2 && (
              <div className="text-success">
                ✅ {specialMenu2} - ₹{special2Fee}
              </div>
            )}
          </div>
        ))}

        {/* Allow user to select special menu */}
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" id="special1"
            onChange={() => setSelectedSpecial1(!selectedSpecial1)}
            checked={selectedSpecial1}
          />
          <label className="form-check-label" htmlFor="special1">
            {specialMenu1} - ₹{special1Fee}
          </label>
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="special2"
            onChange={() => setSelectedSpecial2(!selectedSpecial2)}
            checked={selectedSpecial2}
          />
          <label className="form-check-label" htmlFor="special2">
            {specialMenu2} - ₹{special2Fee}
          </label>
        </div>

        {/* Submit Button */}
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit}>
          Submit Selection
        </motion.button>

        {/* Success Message */}
        {submitted && <div className="text-success mt-3">✅ Special menu submitted successfully!</div>}
      </motion.div>
    </div>
  );
}

export default MealSelectionModule;
