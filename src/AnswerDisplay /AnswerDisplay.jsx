import React from 'react';
import styles from './AnswerDisplay.module.scss';
import DisplayAll from './DisplayAll';

const AnswerDisplay = () => {
  return (
    <div className={styles.adContainer}>
      <DisplayAll />
    </div>
  );
};

export default AnswerDisplay;
