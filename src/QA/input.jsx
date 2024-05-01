import React, { useState } from "react";
import styles from "./QA.module.scss";

function Input({ score }) {
  const [response, setRes] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    score(response.trim()); // Call the score function with the answer
    setRes(""); // Reset the answer for the next input
  };

  return (
    <form onSubmit={onSubmit} className={styles.inputContainer}>
      <div className={styles.inpBox}>
        <input
          type="text"
          placeholder="Type here ..."
          value={response}
          onChange={(e) => setRes(e.target.value)}
        />
      </div>
      <div className={styles.submitButton}>
        <input type="submit" className={styles.butn} value="Submit" />
      </div>
    </form>
  );
}

export default Input;
