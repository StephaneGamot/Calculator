"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { evaluate } from "mathjs";

export default function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [result, setResult] = useState("");
  const [displayedResults, setDisplayedResults] = useState(false);

  const handleDigit = (digit) => {
    setCalculation((prevCalculation) => {
      if (displayedResults) {
        setDisplayedResults(false);
        return digit;
      } else {
        return prevCalculation === "0" ? digit : prevCalculation + digit;
      }
    });
  };

  const handleOpenParenthesis = () => {
    setCalculation((prevCalculation) => prevCalculation + "(");
  };

  const handleCloseParenthesis = () => {
    setCalculation((prevCalculation) => prevCalculation + ")");
  };

  const handleSquareRoot = () => {
    setCalculation((prevCalculation) => {
      try {
        const result = Math.sqrt(evaluate(prevCalculation)).toString(); //const result = Math.sqrt(eval(prevCalculation)).toString();
        return result;
      } catch (error) {
        return "Error";
      }
    });
  };

  const isNegative = () => {
    try {
      // Utiliser math.js pour évaluer l'expression actuelle
      const value = evaluate(calculation);
      return value < 0;
    } catch (error) {
      return false;
    }
  };

  const handleSquare = () => {
    setCalculation((prevCalculation) => {
      try {
        const result = (evaluate(prevCalculation) ** 2).toString();
        return result;
      } catch (error) {
        return "Error";
      }
    });
  };

  const handleOperator = (operator) => {
    setCalculation((prevCalculation) => {
      if (displayedResults) {
        setDisplayedResults(false);
        return result + operator;
      } else if (prevCalculation === "") {
        return prevCalculation;
      } else if (prevCalculation.endsWith(operator)) {
        return prevCalculation;
      } else {
        return prevCalculation + operator;
      }
    });
  };

  const handleDecimal = () => {
    setCalculation((prevCalculation) => {
      if (!prevCalculation.includes(".")) {
        return prevCalculation + ".";
      }
      return prevCalculation;
    });
  };

  const calculateResult = () => {
    try {
      const calculatedResult = evaluate(calculation).toString();
      setResult(calculatedResult);
      setCalculation(calculatedResult);
      setDisplayedResults(true);
    } catch (error) {
      setResult("Error");
    }
  };

  const clearAll = () => {
    setCalculation("");
    setResult("");
    setDisplayedResults(false);
  };

  const handlePercentage = () => {
    setCalculation((prevCalculation) => {
      return String(Number(prevCalculation) / 100);
    });
  };

  const toggleSign = () => {
    setCalculation((prevCalculation) => {
      if (prevCalculation.startsWith("-")) {
        return prevCalculation.substring(1);
      } else {
        return "-" + prevCalculation;
      }
    });
  };

  return (
    <div className={styles.calculator}>
      <div className={`${styles.display} ${result === "Error" ? styles.error : ""}`}>
        <p className={styles.calculation}>{calculation}</p>
        <p className={styles.result}>{result || 0}</p>
        {result === "Erreur de calcul" && <p className={styles.errorMessage}>Veuillez entrer une expression valide.</p>}
      </div>
      <div className={styles.grid}>
        <button className={styles.clearAllButton} onClick={clearAll}>
          C
        </button>
        <button className={styles.clearAllButton} onClick={clearAll}>CE</button>{/* Fonction a changer */}
		<button onClick={handleOpenParenthesis}>(</button>
        <button onClick={handleCloseParenthesis}>)</button>
       
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          ←
        </button>
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          Sci
        </button>
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          Conv
        </button>
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          Fin
        </button>
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          Geo
        </button>
        <button className={styles.fonctionButton} onClick={handleDecimal}>
          Hist
        </button>
		<button className={styles.memoryButton}>M+</button>
		<button className={styles.memoryButton}>M-</button>
		<button className={styles.memoryButton}>Mr</button>
		<button className={styles.memoryButton}>Mc</button>
		<button className={styles.handleOperatorButton} onClick={() => handleOperator("/")} disabled={!calculation || /[\+\-\*\/]$/.test(calculation)}>
          /
        </button>
		<button onClick={handleSquareRoot} disabled={isNegative()}>
          √
        </button>
		<button className={styles.numbersButton} onClick={() => handleDigit("7")}>
          7
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("8")}>
          8
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("9")}>
          9
        </button>
        <button className={styles.handleOperatorButton} onClick={() => handleOperator("*")} disabled={!calculation || /[\+\-\*\/]$/.test(calculation)}>
          x
        </button>
       
		<button onClick={handleSquare}>x²</button>
        <button className={styles.numbersButton} onClick={() => handleDigit("4")}>
          4
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("5")}>
          5
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("6")}>
          6
        </button>
		<button className={styles.handleOperatorButton} onClick={() => handleOperator("-")} disabled={!calculation || /[\+\-\*\/]$/.test(calculation)}>
          -
        </button>
		<button onClick={handlePercentage}>%</button>
        <button className={styles.numbersButton} onClick={() => handleDigit("1")}>
          1
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("2")}>
          2
        </button>
        <button className={styles.numbersButton} onClick={() => handleDigit("3")}>
          3
        </button>
		<button className={styles.handleOperatorButton} onClick={() => handleOperator("+")} disabled={!calculation || /[\+\-\*\/]$/.test(calculation)}>
          +
        </button>
		<button onClick={toggleSign}>-/+</button>
		
        <button className={styles.numbersButton} onClick={() => handleDigit("0")}>
          0
        </button>
		<button onClick={handleDecimal}>.</button>
        <button onClick={calculateResult} className={styles.resultButton}>
          =
        </button>

		
        
      </div>
    </div>
  );
}
