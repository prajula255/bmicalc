
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
    <div style={styles.container}>
      <h1 style={styles.header}>BMI Calculator</h1>

      <div style={styles.inputContainer}>
        <strong>Gender:</strong>
        <div>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              style={styles.radio}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              style={styles.radio}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
              style={styles.radio}
            />
            Other
          </label>
        </div>
      </div>


      <div style={styles.inputContainer}>
        <label>
          <strong>Height (cm):</strong>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
            style={styles.input}
          />
        </label>
      </div>
      <div style={styles.inputContainer}>
        <label>
          <strong>Weight (kg):</strong>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
            style={styles.input}
          />
        </label>
      </div>



      <div style={styles.buttonContainer}>
        <button onClick={calculateBMI} style={styles.calculateButton}>
          Calculate BMI
        </button>
        <button onClick={resetFields} style={styles.resetButton}>
          Reset
        </button>
      </div>


      {error && <div style={styles.error}>{error}</div>}


      {bmi && !error && (
        <div style={styles.resultContainer}>
          <h2>Your BMI: {bmi}</h2>
          <h3 style={{ color: getCategoryColor(category) }}>Category: {category}</h3>
          <p><strong>Gender:</strong> {gender}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    margin: "20px auto",
    maxWidth: "400px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    color: "#333",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginTop: "5px",
    fontSize: "16px",
  },
  radio: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  buttonContainer: {
    marginTop: "10px",
  },
  calculateButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  resetButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
  },
  error: {
    color: "red",
    marginTop: "20px",
  },
  resultContainer: {
    marginTop: "20px",
  },
};

export default App;
