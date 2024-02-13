import React from 'react';
import styles from './AnswerDisplay.module.scss';

const DisplayAll = () => {
  return (
    <div className={styles.answerContainer}>
      {' '}
      <p className={styles.title}>Guesses</p>
    </div>
  );
};

export default DisplayAll;
