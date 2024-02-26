import React, { useState, useEffect, useContext } from 'react';
import styles from './Leaderboard.module.scss';
import DisplayUsers from './DisplayUsers';
import Socket from '../socket';

const Leaderboard = ({ players }) => {
  return (
    <div className={styles.leaderboardContainer}>
      <DisplayUsers users={players} />
    </div>
  );
};

export default Leaderboard;
