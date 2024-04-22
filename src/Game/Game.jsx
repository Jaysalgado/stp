import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Game.module.scss";
import QA from "../QA/QA";
import Leaderboard from "../Leaderboard/Leaderboard";
import AnswerDisplay from "../AnswerDisplay/AnswerDisplay";
import Socket from "../socket";

function Game() {
  const socket = useContext(Socket);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(getUsernameCookie());
  const [users, setUsers] = useState([]);
  const [answer, setAnswers] = useState([]);

  useEffect(() => {
    socket.emit("room exists", roomId);
    socket.on("true", () => {
      const user = username ? username : createUsername();
      if (!username) {
        setUsername(user);
        saveUsernameCookie(user);
      }
      socket.emit("join game", { roomId, user });
      socket.on("joined game", (room) => {
        console.log("Joined room:", room);
      });
      socket.on("player joined", (id) => {
        console.log("player joined", id);
        console.log("hey " + username);
      });
      socket.emit("get users", roomId);
      socket.on("users", (users) => {
        const arr = Object.entries(users);
        const sortedArr = arr.sort((a, b) => b[1] - a[1]);
        setUsers(sortedArr);
      });
      socket.on("display answer", (answers) => {
        console.log("answers", answers);
        setAnswers(answers);
      });
    });
    socket.on("error joining", (message) => {
      navigate("/");
      console.log(message);
    });
    return () => {
      socket.off("joined game");
      socket.off("player joined");
      socket.off("error joining");
      socket.off("true");
      socket.off("users");
      socket.off("display answer");
    };
  }, [socket, roomId, username, navigate]);

  const saveUsernameCookie = (username) => {
    const path = `/room/${roomId}`;
    const daysToExpire = 1;
    const expires = new Date(
      Date.now() + daysToExpire * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `username=${username}; expires=${expires}; path=${path}`;
  };

  function getUsernameCookie() {
    const cookies = document.cookie.split("; ");
    const usernameCookie = cookies.find((cookie) =>
      cookie.startsWith("username=")
    );
    return usernameCookie ? usernameCookie.split("=")[1] : false;
  }

  const createUsername = () => {
    const min = Math.ceil(0); // Ensure the min is rounded up to the nearest whole number
    const max = Math.floor(100); // Ensure the max is rounded down to the nearest whole number
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    const getName = "User" + num.toString();
    return getName;
  };

  return (
    <div className={styles.gameContainer}>
      <Leaderboard players={users} user={username} />
      <QA room={roomId} user={username} />
      <AnswerDisplay answers={answer} />
    </div>
  );
}

export default Game;
