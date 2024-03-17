import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GameSetUp.module.scss';
import LinkCopy from './LinkCopy';
import Socket from '../socket';

function GameSetUp() {
  const socket = useContext(Socket);
  const [roomID, setRoomID] = useState(null);
  const [getLink, setLink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the 'game created' event from the server
    socket.on('game created', (id) => {
      console.log('Game created with ID:', id);
      setRoomID(id); // Set the roomID state to the received ID
    });

    // Cleanup the effect to prevent memory leaks
    return () => {
      socket.off('game created');
    };
  }, [socket]);

  const createGame = () => {
    socket.emit('create game'); // Tell the server to create a new game
  };

  const link = () => {
    setLink(true);
  };
  const go = () => {
    navigate(`/room/${roomID}`);
  };

  return (
    <div className={styles.container}>
      {getLink ? (
        <div className={styles.linkDisplay}>
          <h1>Room Link:</h1>{' '}
          <LinkCopy link={`http://localhost:3000/room/${roomID}`} />
          <div className={styles.start} onClick={go}>
            Start
          </div>
        </div>
      ) : (
        <div
          className={styles.create}
          onClick={() => {
            createGame();
            link();
          }}
        >
          Create Room
        </div>
      )}
    </div>
  );
}

export default GameSetUp;
