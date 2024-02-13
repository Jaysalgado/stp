import React from 'react';
import styles from './Leaderboard.module.scss';
import DisplayUsers from './DisplayUsers';

const Leaderboard = () => {
  return (
    <div className={styles.leaderboardContainer}>
      <DisplayUsers />
    </div>
  );
};

export default Leaderboard;
