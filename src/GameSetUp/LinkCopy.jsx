import React, { useState } from 'react';
import styles from './GameSetUp.module.scss';

const LinkCopy = ({ link }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link); //browswer API
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className={styles.copyContainer}>
      <input className={styles.input} type="text" value={link} readOnly />
      <div className={styles.cpyButn} onClick={copyToClipboard}>
        Copy
      </div>
      {copySuccess && (
        <div className={styles.copied} style={{ marginLeft: '10px' }}>
          {copySuccess}
        </div>
      )}
    </div>
  );
};

export default LinkCopy;
