import React from 'react';
import styles from './QA.module.scss';

function Input() {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inpBox}>
        <input type="text" placeholder="Type answer ..." />
      </div>
      <div className={styles.submitButton}>
        <div className={styles.butn}>Submit</div>
      </div>
    </div>
  );
}

export default Input;
