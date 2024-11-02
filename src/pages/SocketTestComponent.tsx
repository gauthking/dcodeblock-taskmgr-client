import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8001"); // Change this URL if your server is on a different address or port

function SocketTestComponent() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Check if connection is successful
    socket.on("connect", () => {
      console.log("Connected to the server");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      setIsConnected(false);
    });

    // Listen for real-time task events
    socket.on("task_created", (task) => {
      console.log("Task created:", task);
      setMessages((prev) => [...prev, `Task created: ${task.title}`]);
    });

    socket.on("task_updated", (task) => {
      console.log("Task updated:", task);
      setMessages((prev) => [...prev, `Task updated: ${task.title}`]);
    });

    socket.on("task_deleted", (taskId) => {
      console.log("Task deleted:", taskId);
      setMessages((prev) => [...prev, `Task deleted: ${taskId}`]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Socket Connection Test</h2>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <h3>Messages:</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default SocketTestComponent;
