import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { io } from "socket.io-client";
import { Task } from "../@types/types";

const socket = io("http://localhost:8001");

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Task["status"] | "All">("All");
  const [sortBy, setSortBy] = useState<"dueDate" | "status">("dueDate");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:8001/tasks");
      setTasks(response.data);
    };

    fetchTasks();

    // Listening for real-time events
    socket.on("task_created", (task: Task) => {
      console.log("New task received:", task);
      setTasks((prev) => [...prev, task]);
      addNotification(`Task "${task.title}" has been created!`);
    });

    socket.on("task_updated", (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      addNotification(`Task "${updatedTask.title}" has been updated!`);
    });

    socket.on("task_deleted", (taskId: string) => {
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      addNotification(`Task has been deleted!`);
    });

    return () => {
      socket.off("task_created");
      socket.off("task_updated");
      socket.off("task_deleted");
    };
  }, []);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    addToast(message);
  };

  const addToast = (message: string) => {
    setToasts((prev) => [...prev, message]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  const addTask = async () => {
    try {
      if (newTask.trim()) {
        const task: Omit<Task, "_id"> = {
          title: newTask,
          status: "Pending",
          dueDate: new Date().toISOString().split("T")[0],
        };
        await axios.post("http://localhost:8001/tasks", task);
        setNewTask("");
      }
    } catch (error) {
      console.log("error adding task - ", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.post(`http://localhost:8001/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTaskStatus = async (id: string, status: Task["status"]) => {
    try {
      await axios.put(`http://localhost:8001/tasks/${id}`, { status });
    } catch (error) {
      console.log("Error updating task status - ", error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => filter === "All" || task.status === filter)
    .sort((a, b) =>
      sortBy === "dueDate"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : a.status.localeCompare(b.status)
    );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Real-Time Task Manager</h1>

      {/* Task input and add button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="inline-block w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      {/* Filter and sort options */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          onChange={(e) => setFilter(e.target.value as Task["status"] | "All")}
          className="w-full md:w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          onChange={(e) => setSortBy(e.target.value as "dueDate" | "status")}
          className="w-full md:w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Task list */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Due: {task.dueDate}</p>
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : task.status === "In Progress"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {task.status}
              </span>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <select
                onChange={(e) =>
                  updateTaskStatus(task._id, e.target.value as Task["status"])
                }
                value={task.status}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Notification dropup */}
      <div className="fixed bottom-4 right-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="bg-white p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <BellIcon className="w-6 h-6 text-gray-600" />
          </button>
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
          {showNotifications && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-2 text-sm text-gray-500">
                    No notifications
                  </p>
                ) : (
                  <ul>
                    {notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200 last:border-b-0"
                      >
                        {notification}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={() => setNotifications([])}
                  className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50">
        {toasts.map((toast, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg mb-2 flex items-center justify-between"
          >
            <span>{toast}</span>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((_, i) => i !== index))
              }
              className="ml-2 text-gray-300 hover:text-white focus:outline-none"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
