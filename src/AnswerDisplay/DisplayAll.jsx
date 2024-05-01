import React from "react";
import styles from "./AnswerDisplay.module.scss";

const DisplayAll = ({ answers }) => {
  return (
    <div className={styles.answerContainer}>
      <p className={styles.title}>Chat</p>
      {answers.length > 0 && (
        <div className={styles.answers}>
          {answers.map((answer, index) => {
            return (
              <div key={index} className={styles.answer}>
                <div>{answer}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayAll;
