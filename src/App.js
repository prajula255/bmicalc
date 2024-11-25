import './App.css';
import React, { useState } from "react";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBMI = height && weight ? (weight / (heightInMeters ** 2)).toFixed(2) : null;

    setBMI(calculatedBMI);

    setError(
      !height || !weight
        ? "Please enter valid height and weight."
        : height <= 0 || weight <= 0
          ? "Height and weight must be greater than zero."
          : ""
    );

    const category =
      calculatedBMI < 18.5 ? "Underweight" :
        calculatedBMI <= 24.9 ? "Normal weight" :
          calculatedBMI <= 29.9 ? "Overweight" :
            "Obesity";

    setCategory(category);
  };

  const resetFields = () => {
    setHeight("");
    setWeight("");
    setGender("male");
    setBMI(null);
    setCategory("");
    setError("");
  };

  const getCategoryColor = (category) =>
    category === "Underweight" ? "blue" :
      category === "Normal weight" ? "green" :
        category === "Overweight" ? "orange" :
          "red";

  return (
    <div className="container">
      <h1 className="header">BMI Calculator</h1>

      <div className="input-group">
        <label className="label">Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>
        </div>
      </div>

      <div className="input-group">
        <label className="label">Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter height in cm"
          className="input"
        />
      </div>
      <div className="input-group">
        <label className="label">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kg"
          className="input"
        />
      </div>

      <div className="button-group">
        <button onClick={calculateBMI} className="btn calculate-btn">
          Calculate BMI
        </button>
        <button onClick={resetFields} className="btn reset-btn">
          Reset
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {bmi && !error && (
        <div className="result">
          <h2>Your BMI: {bmi}</h2>
          <h3 style={{ color: getCategoryColor(category) }}>Category: {category}</h3>
          <p><strong>Gender:</strong> {gender}</p>
        </div>
      )}
    </div>
  );
}

export default App;
