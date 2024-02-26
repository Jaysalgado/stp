import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.scss';

const DisplayUsers = ({ users }) => {
  return (
    <div className={styles.usersContainer}>
      <p className={styles.title}>Leaderboard</p>
      {users && users.length > 0 && (
        <div className={styles.users}>
          {users.map((user, index) => {
            return (
              <div key={index} className={styles.user}>
                <div>{user + ':'}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;
