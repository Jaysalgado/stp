import React, { useContext } from 'react';
import styles from './QA.module.scss';
import QuestionDisplay from './questionDisplay';
import Input from './input';
import Socket from '../socket';

function QA({ user, room }) {
  const socket = useContext(Socket);
  const answer = 'div';
  const increaseScore = (response) => {
    if (response === answer) {
      socket.emit('score increased', { user, room });
    } else if (response.length > 0) {
      socket.emit('display guess', { user, room, response });
    }
  };

  return (
    <div className={styles.qaContainer}>
      <QuestionDisplay />
      <Input score={increaseScore} />
    </div>
  );
}

export default QA;
