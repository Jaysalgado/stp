import React from 'react';
import styles from './Game.module.scss';
import QA from '../QA/QA';
import Leaderboard from '../Leaderboard/Leaderboard';
import AnswerDisplay from '../AnswerDisplay /AnswerDisplay';

function Game() {
  return (
    <div className={styles.gameContainer}>
      <Leaderboard />
      <QA />
      <AnswerDisplay />
    </div>
  );
}

export default Game;
