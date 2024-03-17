import React from 'react';
import styles from './AnswerDisplay.module.scss';
import DisplayAll from './DisplayAll';

const AnswerDisplay = ({ answers }) => {
  console.log('answers', answers);
  return (
    <div className={styles.adContainer}>
      <DisplayAll answers={answers} />
    </div>
  );
};

export default AnswerDisplay;
