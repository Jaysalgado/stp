import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.scss';

const DisplayUsers = ({ users, username }) => {
  console.log('users', users);
  return (
    <div className={styles.usersContainer}>
      <p className={styles.title}>Leaderboard</p>
      {users.length > 0 && (
        <div className={styles.users}>
          {users.map((user, index) => {
            return (
              <div key={index} className={styles.user}>
                <div className={user[0] === username ? `${styles.them}` : ''}>
                  {user[0] + ':'}
                </div>
                <div className={styles.score}>{user[1]}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;
