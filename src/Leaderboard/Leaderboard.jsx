import React, { useState, useEffect, useContext } from 'react';
import styles from './Leaderboard.module.scss';
import DisplayUsers from './DisplayUsers';
import Socket from '../socket';

const Leaderboard = ({ players, user }) => {
  return (
    <div className={styles.leaderboardContainer}>
      <DisplayUsers users={players} username={user} />
    </div>
  );
};

export default Leaderboard;
