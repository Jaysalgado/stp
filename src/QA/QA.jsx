import React from 'react';
import styles from './QA.module.scss';
import QuestionDisplay from './questionDisplay';
import Input from './input';

function QA() {
  return (
    <div className={styles.qaContainer}>
      <QuestionDisplay />
      <Input />
    </div>
  );
}

export default QA;
