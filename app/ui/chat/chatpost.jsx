'use client'
// pages/chat.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './chat.module.css';
import { useSession } from 'next-auth/react';

let socket;

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket = io();
    socket.on('receiveMessage', (msg) => {
      setChatHistory((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: 'User1', // Replace with actual user ID
      receiver: 'User2', // Replace with actual recipient ID
      content: message,
    };
    socket.emit('sendMessage', newMessage);
    setMessage('');
  };

  useEffect(() => {
    
  }, []);

  return (
      <form onSubmit={sendMessage} className={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
  );
}